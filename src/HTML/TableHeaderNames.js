/* 
 *  Created by Somesh Chatterjee.
 */

var TableHeaderNames = (function ()
{
    var IncomingHeaderNames = {
            ID: "ID",
            CompanyName: "Company Name",
            CompanyAddress: "Company Address",
            MOC: "MOC/Descr.",
            QualityCode: "Quality Code",
            StockLoc: "Stock Loc.",
            Width: "Width",
            Length: "Length",
            NoOfRolls: "No. Of Rolls/Items",
            LoomNo: "Loom No.",
            BatchNo: "Batch No.",
            PieceNo: "Piece No.",
            IncomingDate: "Incoming Date",
            TransporterName: "Transporter Name",
            TransporterAddr: "Transporter Addr.",
            TransporterContact: "Transporter Contact",
            InvoiceNo: "Invoice No.",
            InvoiceDate: "Invoice Date",
            Remarks: "Remarks"
    };
    
    var OutgoingHeaderNames = {
            ID: "ID",
            CompanyName: "Company Name",
            CompanyAddress: "Company Address",
            MOC: "MOC/Descr.",
            QualityCode: "Quality Code",
            StockLoc: "Stock Loc.",
            Width: "Width",
            Length: "Length",
            NoOfRolls: "No. Of Rolls/Items",
            LoomNo: "Loom No.",
            BatchNo: "Batch No.",
            PieceNo: "Piece No.",
            OutgoingDate: "Outgoing Date",
            TransporterName: "Transporter Name",
            TransporterAddr: "Transporter Addr.",
            TransporterContact: "Transporter Contact",
            Remarks: "Remarks"
    };    
    
    var MOCAndQualityCodeHeaderName = {
            ID: "ID",
            MOC: "MOC/Descr.",
            QualityCode: "QualityCode"
    };
    
    var CompanyMasterTableName = {
            ID: "ID",
            CompanyName: "Company Name",
            CompanyAddress: "Company Address",
            Contact: "Contact"
    };
    
    var TransporterTableName = {
            ID: "ID",
            TransporterName: "Transporter Name",
            TransporterAddress: "Transporter Addr.",
            Contact: "Contact"
    };    
    
    var DashboardHeader = {
            MOC: "MOC/Descr.",
            QualityCode: "QualityCode",            
            Width: "Width",
            Length: "Length"            
    };
    
    var DashboardSuperLedger = {
            MOC: "MOC/Descr.",
            QualityCode: "QualityCode",            
            Width: "Width",
            IncomingLength: "Incoming Length",            
            OutgoingLength: "Outgoing Length",
            ID: "ID",
            CompanyName: "Company Name",
            Date: "Date"
    };
    
    return {
        IncomingHeaderNames: IncomingHeaderNames,
        OutgoingHeaderNames: OutgoingHeaderNames,
        MOCAndQualityCodeHeaderName: MOCAndQualityCodeHeaderName,
        CompanyMasterTableName: CompanyMasterTableName,
        TransporterTableName: TransporterTableName,
        DashboardHeader: DashboardHeader,
        DashboardSuperLedger: DashboardSuperLedger
    };
})();