import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

/**
 * Export election results to PDF
 * @param {Array} candidates - Array of candidate objects
 * @param {string} filename - Name of the PDF file
 */
export const exportToPDF = (candidates, filename = 'election_results.pdf') => {
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Election Results', 14, 22);

    // Add timestamp
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    // Map seat codes to readable names
    const seatMap = {
        'chair': 'Chairman',
        'vchair': 'Vice Chairman',
        'secretery': 'Secretary',
        'ladyrep': 'Lady Representative'
    };

    // Prepare table data
    const tableData = candidates.map((candidate, index) => [
        index + 1,
        candidate.name,
        seatMap[candidate.seat] || candidate.seat,
        candidate.dept,
        `Semester ${candidate.sem}`,
        candidate.vote
    ]);

    // Add table
    doc.autoTable({
        head: [['#', 'Name', 'Position', 'Department', 'Semester', 'Votes']],
        body: tableData,
        startY: 35,
        theme: 'grid',
        headStyles: {
            fillColor: [59, 130, 246], // Blue color
            textColor: 255,
            fontStyle: 'bold'
        },
        alternateRowStyles: {
            fillColor: [245, 247, 250]
        },
        margin: { top: 35 }
    });

    // Add footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.text(
            `Page ${i} of ${pageCount}`,
            doc.internal.pageSize.getWidth() / 2,
            doc.internal.pageSize.getHeight() - 10,
            { align: 'center' }
        );
    }

    // Save the PDF
    doc.save(filename);
};

/**
 * Export election results to Excel
 * @param {Array} candidates - Array of candidate objects
 * @param {string} filename - Name of the Excel file
 */
export const exportToExcel = (candidates, filename = 'election_results.xlsx') => {
    // Map seat codes to readable names
    const seatMap = {
        'chair': 'Chairman',
        'vchair': 'Vice Chairman',
        'secretery': 'Secretary',
        'ladyrep': 'Lady Representative'
    };

    // Prepare data for Excel
    const excelData = candidates.map((candidate, index) => ({
        '#': index + 1,
        'Name': candidate.name,
        'Position': seatMap[candidate.seat] || candidate.seat,
        'Department': candidate.dept,
        'Semester': candidate.sem,
        'Votes': candidate.vote,
        'Admission Number': candidate.id
    }));

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
        { wch: 5 },  // #
        { wch: 25 }, // Name
        { wch: 20 }, // Position
        { wch: 15 }, // Department
        { wch: 10 }, // Semester
        { wch: 8 },  // Votes
        { wch: 18 }  // Admission Number
    ];
    worksheet['!cols'] = columnWidths;

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Results');

    // Add metadata sheet
    const metadataSheet = XLSX.utils.json_to_sheet([
        { 'Property': 'Generated On', 'Value': new Date().toLocaleString() },
        { 'Property': 'Total Candidates', 'Value': candidates.length },
        { 'Property': 'Total Votes', 'Value': candidates.reduce((sum, c) => sum + c.vote, 0) }
    ]);
    XLSX.utils.book_append_sheet(workbook, metadataSheet, 'Metadata');

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    // Save the file
    saveAs(blob, filename);
};
