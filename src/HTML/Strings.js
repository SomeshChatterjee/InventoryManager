/* 
 *  Created by Somesh Chatterjee.
 */

var Strings = (function ()
{
    var MocAndQualityNotDefined = "You need to have at-least MOC & Quality Code defined.";
    var ConfirmSubmit = "For an entry to be complete it must have: \nBatch No. \nPieceNumber \nLoomNumber \nWidth \nDo you really want to enter this data?";
    var DuplicateEntry = "An entry with this data already exists. \nFor an entry to be unique it must have an unique combination of: \nMOC \nQuality Code \nDate \nBatch No. \nPieceNumber \nLoomNumber \nWidth \n\tDuplicate of ID: ";
    var DuplicateEntryForCompanyMaster = "An entry with this data already exists. \nFor an entry to be unique it must have an unique company name. \n\tDuplicate of ID: ";
    var DuplicateEntryForItemMaster = "An entry with this data already exists. \nFor an entry to be unique it must have an unique combination of MOC and Quality Code. \n\tDuplicate of ID: ";
    var DuplicateEntryForTransporter = "An entry with this data already exists. \nFor an entry to be unique it must have an unique transporter name. \n\tDuplicate of ID: ";
    var CompanyNameNotDefined = "You need to have at-least the company name defined.";
    var TransporterNameNotDefined = "You need to have at-least the transporter name defined.";
    var SuccessfulSubmit = "Transaction is successfully added. ID: ";
    var EitherMOCOrQualityCodeNotDefined = "You need to have both MOC & Quality Code defined.";
    
    return {
        MocAndQualityNotDefined : MocAndQualityNotDefined,
        ConfirmSubmit: ConfirmSubmit,
        DuplicateEntry: DuplicateEntry,
        CompanyNameNotDefined: CompanyNameNotDefined,
        DuplicateEntryForCompanyMaster: DuplicateEntryForCompanyMaster,
        TransporterNameNotDefined: TransporterNameNotDefined,
        DuplicateEntryForTransporter: DuplicateEntryForTransporter,
        SuccessfulSubmit: SuccessfulSubmit,
        EitherMOCOrQualityCodeNotDefined: EitherMOCOrQualityCodeNotDefined,
        DuplicateEntryForItemMaster: DuplicateEntryForItemMaster
    };
})();