import { Component, OnInit } from '@angular/core';
import { LabelService } from '../../../../service/label.service';
import { ChartModule } from 'primeng/chart';
import { LanguageServiceService } from 'src/app/service/language-service.service';

@Component({
    selector: 'app-statistique',
    standalone: true,
    imports: [ChartModule],
    templateUrl: './statistique.component.html',
    styleUrl: './statistique.component.scss',
})
export class StatistiqueComponent implements OnInit {
    linearChartText: string;
    barChartText: string;
    pieChartText: string;

    lineData: any;

    barData: any;

    pieData: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    constructor(
        private labelService: LabelService,
        private languageService: LanguageServiceService
    ) {}
    ngOnInit(): void {
        this.languageService.currentLanguage$.subscribe(() => {
            this.getTranslations(); // Call the function to update translations when language changes
        });
        this.getTranslations(); // Call the function initially to load translations
        this.getBarChar();
        this.getLinearChar();

        this.labelService.getLabelStatistics().subscribe(
            (res: any[]) => {
                console.log(res);

                // Generate dynamic colors
                const dynamicColors = this.generateDynamicColors(res.length);

                this.pieData = {
                    labels: res.map((item) => item.labelName),
                    datasets: [
                        {
                            data: res.map((item) => item.documentationCount),
                            backgroundColor: dynamicColors,
                            hoverBackgroundColor: dynamicColors.map((color) =>
                                this.darkenColor(color, 10)
                            ),
                        },
                    ],
                };
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getTranslations(): void {
        // Fetch translations for chart titles from LanguageServiceService
        this.linearChartText = this.languageService.getTranslation('linearChart');
        this.barChartText = this.languageService.getTranslation('barChart');
        this.pieChartText = this.languageService.getTranslation('pieChart');
    }
    

    generateDynamicColors(numColors: number): string[] {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(this.dynamicColorGenerator());
        }
        return colors;
    }

    // Function to generate a single dynamic color
    dynamicColorGenerator(): string {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    // Function to darken a color
    darkenColor(color: string, amount: number): string {
        let col = parseInt(color, 16);
        const amt = Math.round(2.55 * amount);
        const r = (col >> 16) - amt < 0 ? 0 : (col >> 16) - amt;
        const b =
            ((col >> 8) & 0x00ff) - amt < 0 ? 0 : ((col >> 8) & 0x00ff) - amt;
        const g = (col & 0x0000ff) - amt < 0 ? 0 : (col & 0x0000ff) - amt;
        return '#' + (g | (b << 8) | (r << 16)).toString(16);
    }
    getBarChar() {
        this.labelService.getStat().subscribe(
            (data: any) => {
                const labels = Object.keys(data);
                const values = Object.values(data);

                this.barData = {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Average Description Length',
                            data: values,
                        },
                    ],
                };

                this.barOptions = {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                };
            },
            (error) => {
                console.log(error);
            }
        );
    }

    private getLinearChar() {
        this.labelService.getLinearChart().subscribe(
            (data: any) => {
                const labels = Object.keys(data);
                const months = Object.keys(data[labels[0]]); // Extract months from the first label

                const datasets = labels.map((label) => {
                    const counts = months.map(
                        (month) => data[label][month] || 0
                    ); // Get count for each month or default to 0
                    return {
                        label: label,
                        data: counts,
                        fill: false,
                        borderColor: this.dynamicColorGenerator(), // You can use dynamic colors if needed
                    };
                });

                this.lineData = {
                    labels: months,
                    datasets: datasets,
                };

                this.lineOptions = {
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },
                };
            },
            (error) => {
                console.log(error);
            }
        );
    }
}
