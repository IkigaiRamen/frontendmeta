import { Change } from './../../../../../../node_modules/@ckeditor/ckeditor5-utils/src/difftochanges.d';
import {
    Component,
    EventEmitter,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { InitEditableRow, TableModule } from 'primeng/table';
import { LabelService } from '../../../service/label.service';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { NgForOf, NgIf } from '@angular/common';
import { MessageService } from 'primeng/api';
import { DocumentationService } from '../../../service/documentation.service';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { NotificationServiceService } from '../../../service/notification-service.service';
import { Router, RouterOutlet } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
    CKEditorComponent,
    CKEditorModule,
    ChangeEvent,
} from '@ckeditor/ckeditor5-angular';
import { DropdownModule } from 'primeng/dropdown';
import { LanguageServiceService } from 'src/app/service/language-service.service';
import { Subscription } from 'rxjs';
declare var webkitSpeechRecognition: new () => any;

interface expandedRows {
    [key: string]: boolean;
}

@Component({
    selector: 'app-label',
    standalone: true,
    imports: [
        ToastModule,
        TableModule,
        ButtonModule,
        RippleModule,
        ToggleButtonModule,
        ToolbarModule,
        FileUploadModule,
        DialogModule,
        InputTextModule,
        NgIf,
        CKEditorModule,
        InputTextareaModule,
        NgForOf,
        RouterOutlet,
        DropdownModule,
    ],
    templateUrl: './label.component.html',
    styleUrl: './label.component.scss',
})
export class LabelComponent implements OnInit {
    @ViewChild('editor') editorComponent: CKEditorComponent;
    cities: any[] | undefined;

    selectedCity: any | undefined;

    public Editor = ClassicEditor;
    text: string = '';
    tempText: string = '';
    prompt: string = '';
    isPrompt = false;
    expandedRows: expandedRows = {};
    isExpanded: boolean = false;
    labels: any;
    selectedLabels: any | boolean;
    labelDialog: boolean = false;
    label: any;
    submitted: boolean = false;
    deleteLabelDialog: boolean;
    documentDialog: boolean = false;
    document: any = {};
    receivedMessages: string[] = [];
    isEditDocumentMode: boolean = false;
    input: any;
    currentLanguage: string = 'en'; // Default language
    languageSubscription: Subscription;
    newLabelButtonText: string = 'New';
    deleteLabelText: string = 'Delete';
    importLabelText: string = 'Import';
    exportLabelText: string = 'Export';
    seeStatButtonText: string = 'See Stat';
    deleteConfirmationText: string = 'Are you sure you want to delete';
    collapseAllText: string = 'Collapse All';
    expandAllText: string = 'Expand All';
    nameLabel: string = 'Name';
    actionsLabel: string = 'Actions';
    noDocumentsText: string = 'There are no documents for this label yet.';
    Country: string = 'Country';
    noCountry: string = 'Country is required.';
    AItext: string = 'Generate description with AI';
    Cancel: string = 'Cancel';
    Save: String = 'Save';
    Row: String = 'Row exapnd';
    Expand: String = 'Expand all';
    Collapse: String = 'Collapse all';

    constructor(
        private lableService: LabelService,
        private messageService: MessageService,
        private docService: DocumentationService,

        public notificationService: NotificationServiceService,
        private languageService: LanguageServiceService,
        private router: Router
    ) {}

    expandAll() {
        if (!this.isExpanded) {
            this.labels.forEach((label) =>
                label && label._id ? (this.expandedRows[label._id] = true) : ''
            );
        } else {
            this.expandedRows = {};
        }
        this.isExpanded = !this.isExpanded;
    }

    ngOnInit(): void {
        this.cities = [
            { name: 'France', code: 'FR' },
            { name: 'Canada', code: 'CA' },
        ];
        this.languageService.currentLanguage$.subscribe(() => {
            this.getTranslations(); // Call the function to update translations when language changes
        });
        this.getTranslations();
        this.loadData();
    }

    private loadData() {
        this.lableService.getAll().subscribe(
            (res) => {
                console.log('data', res);
                this.labels = res;
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getTranslations(): void {
        // Fetch translations for chart titles from LanguageServiceService
        this.newLabelButtonText =
            this.languageService.getTranslation('newLabelButtonText');
        this.deleteLabelText =
            this.languageService.getTranslation('deleteLabelText');
        this.importLabelText =
            this.languageService.getTranslation('importLabelText');
        this.exportLabelText =
            this.languageService.getTranslation('exportLabelText');
        this.seeStatButtonText =
            this.languageService.getTranslation('seeStatButtonText');
        this.deleteConfirmationText = this.languageService.getTranslation(
            'deleteConfirmationText'
        );
        this.deleteLabelText =
            this.languageService.getTranslation('deleteButton');
        this.collapseAllText =
            this.languageService.getTranslation('Collapse');
        this.expandAllText = this.languageService.getTranslation('Expand');
        this.nameLabel = this.languageService.getTranslation('Name');
        this.actionsLabel = this.languageService.getTranslation('actions');
        this.noDocumentsText =
            this.languageService.getTranslation('noDocuments');
        this.Country = this.languageService.getTranslation('Country');
        this.noCountry = this.languageService.getTranslation('noCountry');
        this.Save = this.languageService.getTranslation('Save');
        this.Cancel = this.languageService.getTranslation('Cancel');
        this.AItext = this.languageService.getTranslation('Ai');
    }

    onEditorChange({ editor }: ChangeEvent) {
        if (!this.isPrompt) {
            const latestText = editor.getData();
            const index = latestText.indexOf('<p>//</p>');
            if (index > 0 && index + '<p>//</p>'.length === latestText.length) {
                this.isPrompt = true;
                this.tempText = latestText.replace('<p>//</p>', '');
                editor.setData('');
            }
        } else if (this.isPrompt) {
            this.prompt = editor.getData();

            console.log(this.prompt);
            editor.editing.view.document.on(
                'enter',
                (evt, data) => {
                    data.preventDefault();
                    evt.stop();
                    this.lableService
                        .getPrompt({
                            prompt: this.prompt
                                .replace(/<p>/g, '')
                                .replace(/<\/p>/g, ''),
                            regulation: 'regpd',
                        })
                        .subscribe({
                            next: (payload) => {
                                console.log('success');
                                console.log(payload);
                                editor.setData(
                                    this.tempText +
                                        '<p> <h5>' +
                                        payload.result +
                                        '</h5></p>'
                                );
                                this.text =
                                    this.tempText +
                                    '<p>' +
                                    payload.result +
                                    '/<p>';
                                this.isPrompt = false;
                                this.prompt = '';
                            },
                            error: (err) => {
                                console.log('error');
                                console.error(err); // Log the error for debugging
                            },
                        });
                },
                { priority: 'high' }
            );

            editor.editing.view.document.on(
                'enter',
                (evt, data) => {
                    data.preventDefault();
                    evt.stop();

                    editor.execute('enter');
                    editor.editing.view.scrollToTheSelection();
                },
                { priority: 'high' }
            );
        }
    }

    toggleExpansion(_id: any) {
        this.isExpanded = !this.isExpanded;
    }

    deleteSelectedLabels() {
        this.deleteLabelDialog = true;
    }

    openNew() {
        this.label = {};
        this.submitted = false;
        this.labelDialog = true;
    }

    hideDialog() {
        this.submitted = false;
        this.labelDialog = false;
    }

    saveLabel() {
        this.submitted = true;
        if (!this.label.name || !this.label.name.match(/^[a-zA-Z\s]*$/)) {
            // Show error message for invalid name
            this.messageService.add({
                severity: 'error',
                summary: 'Validation Error',
                detail: 'Please enter a valid name containing only alphabetic characters.',
                life: 3000,
            });
            return;
        }

        this.lableService.createLabel(this.label).subscribe(
            (res) => {
                this.labelDialog = false;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Label added',
                    life: 3000,
                });
                this.notificationService.sendMessage(
                    'New label added: ' + this.label.name
                );
                this.loadData();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    startListening() {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onresult = (event: {
                results: { transcript: any }[][];
            }) => {
                const transcript = event.results[0][0].transcript;
                this.isPrompt = true;
                const editorInstance = this.editorComponent.editorInstance;
                editorInstance.setData(transcript);
                this.lableService
                    .getPrompt({
                        prompt: this.prompt
                            .replace(/<p>/g, '')
                            .replace(/<\/p>/g, ''),
                        regulation: 'regpd',
                    })
                    .subscribe({
                        next: (payload) => {
                            console.log('success');
                            console.log(payload);
                            editorInstance.setData(
                                this.tempText +
                                    '<p> <h5>' +
                                    payload.result +
                                    '</h5></p>'
                            );
                            this.text =
                                this.tempText + '<p>' + payload.result + '/<p>';
                            this.isPrompt = false;
                            this.prompt = '';
                        },
                        error: (err) => {
                            console.log('error');
                            console.error(err); // Log the error for debugging
                        },
                    });
            };

            recognition.start();
        } else {
            alert('Update your browser or Use Google Chrome browser');
        }
    }

    confirmDelete() {
        this.deleteLabelDialog = false;
        this.lableService.deleteLabel(this.label._id).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'label Deleted',
                    life: 3000,
                });
                this.loadData();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    deleteLabel(label: any) {
        this.deleteLabelDialog = true;
        this.label = { ...label };
    }

    editLabel(label: any) {
        this.label = { ...label };
        this.labelDialog = true;
    }

    affecterNewDocument() {
        console.log('hello');
    }

    deleteDocumentation(doc: any, label: any) {
        this.docService.deleteDocumentation(label._id, doc._id).subscribe(
            () => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Documentation Deleted',
                    life: 3000,
                });
                this.loadData();
            },
            (error) => {
                console.log(error);
            }
        );
    }

    addDocument(label: any) {
        console.log(label);
        this.documentDialog = true;
        this.label = { ...label };
        this.isEditDocumentMode = false;
    }

    hideDialogDoc() {
        this.submitted = false;
        this.documentDialog = false;
    }

    saveDoc() {
        this.submitted = true;

        // Validate country input against the Rest Countries API
        this.lableService.fetchCountryNames().subscribe(
            (countries: any[]) => {
                console.log(countries);
                const countryNames = countries;

                if (countryNames.includes(this.document.country)) {
                    // Country is valid, proceed with saving the documentation
                    if (this.isEditDocumentMode) {
                        console.log('this update data request');
                        console.log(this.document);
                        console.log(this.text);
                        this.document.description = this.tempText;
                        console.log(this.document);
                        this.docService
                            .updateDocumentation(
                                this.document,
                                this.document._id
                            )
                            .subscribe(
                                () => {
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Successful',
                                        detail: 'Documentation updated',
                                        life: 3000,
                                    });
                                    this.loadData();
                                },
                                (error) => {
                                    console.error(
                                        'Error updating documentation:',
                                        error
                                    );
                                }
                            );
                    } else {
                        this.docService
                            .affecterdocumentation(
                                this.document,
                                this.label._id
                            )
                            .subscribe(
                                () => {
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Successful',
                                        detail: 'Documentation Added',
                                        life: 3000,
                                    });
                                    this.loadData();
                                },
                                (error) => {
                                    console.log(error);
                                }
                            );
                        this.hideDialogDoc();
                        this.isEditDocumentMode = !this.isEditDocumentMode;
                    }
                } else {
                    // Country is not valid, display an error message
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Invalid country name',
                        life: 3000,
                    });
                }
            },
            (error) => {
                console.error('Error fetching country data:', error);
            }
        );
    }

    editDocumentation(doc: any) {
        this.isEditDocumentMode = true;
        this.document = { ...doc };

        this.documentDialog = true;
    }

    sendMessage() {
        if (this.input.trim() !== '') {
            this.notificationService.sendMessage(this.input.trim());
            this.input = ''; // Clear the input field after sending the message
        }
    }

    goToStat() {
        this.router.navigate(['/pages/label/statistique']);
    }

    viewDetails(id: string) {
        this.router.navigate(['/pages/label/detail', id]);
    }
}
