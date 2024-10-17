// @ts-ignore
import { generate } from 'multiple-cucumber-html-reporter';

 generate({
    jsonDir: './results', // Path to the directory containing JSON reports 
    reportPath: './reports/html/', // Path where the HTML report should be generated 
    displayDuration: true,
    displayReportTime: true,
    pageTitle: 'Test Report',
    reportName: 'Cucumber Test Report',
    customData: { 
        title: 'Execution Info', 
        data: [ 
            { label: 'Project', value: 'My Project' }, 
            { label: 'Release', value: '1.0.0' },            
            { label: 'Execution Start Time', value: new Date().toLocaleString() }, 
            { label: 'Execution End Time', value: new Date().toLocaleString() }, 
        ] 
    },
    metadata: { 
        browser: { 
            name: 'chrome', 
            version: 'latest',
        }, 
        device: 'Local Machine', 
        platform: { 
            name: process.platform, 
            version: process.version, 
        } 
    }, 
    //Enable screenshots in the report
    embeddedScreenshot: true,
    displayScreenshots: true,
    screenshotsDirectory: '.results/screenshots',
    hideMetadata: false,    
});