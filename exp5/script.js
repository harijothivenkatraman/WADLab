document.addEventListener("DOMContentLoaded", loadPatients);

function addPatient() {
    let patientNo = document.getElementById("patientNo").value;
    let patientName = document.getElementById("patientName").value;
    let phoneNumber = document.getElementById("phoneNumber").value;
    let illness = document.getElementById("illness").value;
    let admissionDate = document.getElementById("admissionDate").value;
    let dischargeDate = document.getElementById("dischargeDate").value || "N/A";

    if (!patientNo || !patientName || !phoneNumber || !illness || !admissionDate) {
        alert("Please fill in all required fields.");
        return;
    }

    let table = document.getElementById("patientTable").getElementsByTagName("tbody")[0];
    let row = table.insertRow();
    
    row.innerHTML = `
        <td>${patientNo}</td>
        <td>${patientName}</td>
        <td>${phoneNumber}</td>
        <td>${illness}</td>
        <td>${admissionDate}</td>
        <td>${dischargeDate}</td>
        <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

    savePatientData();
    clearInputs();
}

function deleteRow(button) {
    button.parentElement.parentElement.remove();
    savePatientData();
}

function clearInputs() {
    document.getElementById("patientNo").value = "";
    document.getElementById("patientName").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("illness").value = "";
    document.getElementById("admissionDate").value = "";
    document.getElementById("dischargeDate").value = "";
}

function savePatientData() {
    let table = document.getElementById("patientTable");
    let rows = Array.from(table.getElementsByTagName("tbody")[0].rows);
    let patients = rows.map(row => {
        return {
            patientNo: row.cells[0].innerText,
            patientName: row.cells[1].innerText,
            phoneNumber: row.cells[2].innerText,
            illness: row.cells[3].innerText,
            admissionDate: row.cells[4].innerText,
            dischargeDate: row.cells[5].innerText
        };
    });

    localStorage.setItem("patients", JSON.stringify(patients));
}

function loadPatients() {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    let table = document.getElementById("patientTable").getElementsByTagName("tbody")[0];

    patients.forEach(patient => {
        let row = table.insertRow();
        row.innerHTML = `
            <td>${patient.patientNo}</td>
            <td>${patient.patientName}</td>
            <td>${patient.phoneNumber}</td>
            <td>${patient.illness}</td>
            <td>${patient.admissionDate}</td>
            <td>${patient.dischargeDate}</td>
            <td><button class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
        `;
    });
}

function exportToCSV() {
    let table = document.getElementById("patientTable");
    let rows = Array.from(table.rows);
    let csvContent = rows.map(row => Array.from(row.cells).map(cell => cell.innerText).join(",")).join("\n");
    
    let blob = new Blob([csvContent], { type: "text/csv" });
    let url = URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = "patients.csv";
    a.click();
}

function exportToExcel() {
    let table = document.getElementById("patientTable");
    let workbook = XLSX.utils.table_to_book(table);
    XLSX.writeFile(workbook, "patients.xlsx");
}
