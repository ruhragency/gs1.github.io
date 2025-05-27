/**
 * GS1 Digital Link Toolkit
 * Complete implementation for GS1 Digital Link and Barcode Generation
 * 
 * @version 2.0.0
 * @author ruhrdot GmbH
 * @license MIT
 */

class GS1DigitalLinkToolkit {
    constructor() {
        // GS1 Application Identifier definitions
        this.aiDefinitions = {
            '00': { name: 'SSCC', type: 'numeric', length: 18, fixedLength: true },
            '01': { name: 'GTIN', type: 'numeric', length: 14, fixedLength: true },
            '02': { name: 'GTIN of contained trade items', type: 'numeric', length: 14, fixedLength: true },
            '10': { name: 'Batch/Lot', type: 'alphanumeric', length: 20, fixedLength: false },
            '11': { name: 'Production date', type: 'numeric', length: 6, fixedLength: true },
            '12': { name: 'Due date', type: 'numeric', length: 6, fixedLength: true },
            '13': { name: 'Packaging date', type: 'numeric', length: 6, fixedLength: true },
            '15': { name: 'Best before date', type: 'numeric', length: 6, fixedLength: true },
            '16': { name: 'Sell by date', type: 'numeric', length: 6, fixedLength: true },
            '17': { name: 'Expiration date', type: 'numeric', length: 6, fixedLength: true },
            '20': { name: 'Internal product variant', type: 'numeric', length: 2, fixedLength: true },
            '21': { name: 'Serial number', type: 'alphanumeric', length: 20, fixedLength: false },
            '22': { name: 'Consumer product variant', type: 'alphanumeric', length: 20, fixedLength: false },
            '240': { name: 'Additional product identification', type: 'alphanumeric', length: 30, fixedLength: false },
            '241': { name: 'Customer part number', type: 'alphanumeric', length: 30, fixedLength: false },
            '242': { name: 'Made-to-Order variation number', type: 'numeric', length: 6, fixedLength: false },
            '243': { name: 'Packaging component number', type: 'alphanumeric', length: 20, fixedLength: false },
            '250': { name: 'Secondary serial number', type: 'alphanumeric', length: 30, fixedLength: false },
            '251': { name: 'Reference to source entity', type: 'alphanumeric', length: 30, fixedLength: false },
            '253': { name: 'Global Document Type Identifier', type: 'numeric', length: 17, fixedLength: false },
            '254': { name: 'GLN extension component', type: 'alphanumeric', length: 20, fixedLength: false },
            '255': { name: 'Global Coupon Number', type: 'numeric', length: 25, fixedLength: false },
            '30': { name: 'Variable count', type: 'numeric', length: 8, fixedLength: false },
            '310': { name: 'Net weight (kg)', type: 'numeric', length: 6, fixedLength: true },
            '311': { name: 'Length/1st dimension (m)', type: 'numeric', length: 6, fixedLength: true },
            '312': { name: 'Width/diameter/2nd dimension (m)', type: 'numeric', length: 6, fixedLength: true },
            '313': { name: 'Depth/thickness/height/3rd dimension (m)', type: 'numeric', length: 6, fixedLength: true },
            '314': { name: 'Area (m²)', type: 'numeric', length: 6, fixedLength: true },
            '315': { name: 'Net volume (l)', type: 'numeric', length: 6, fixedLength: true },
            '316': { name: 'Net volume (m³)', type: 'numeric', length: 6, fixedLength: true },
            '320': { name: 'Net weight (lb)', type: 'numeric', length: 6, fixedLength: true },
            '321': { name: 'Length/1st dimension (in)', type: 'numeric', length: 6, fixedLength: true },
            '322': { name: 'Length/1st dimension (ft)', type: 'numeric', length: 6, fixedLength: true },
            '323': { name: 'Length/1st dimension (yd)', type: 'numeric', length: 6, fixedLength: true },
            '324': { name: 'Width/diameter/2nd dimension (in)', type: 'numeric', length: 6, fixedLength: true },
            '325': { name: 'Width/diameter/2nd dimension (ft)', type: 'numeric', length: 6, fixedLength: true },
            '326': { name: 'Width/diameter/2nd dimension (yd)', type: 'numeric', length: 6, fixedLength: true },
            '327': { name: 'Depth/thickness/height/3rd dimension (in)', type: 'numeric', length: 6, fixedLength: true },
            '328': { name: 'Depth/thickness/height/3rd dimension (ft)', type: 'numeric', length: 6, fixedLength: true },
            '329': { name: 'Depth/thickness/height/3rd dimension (yd)', type: 'numeric', length: 6, fixedLength: true },
            '330': { name: 'Logistic weight (kg)', type: 'numeric', length: 6, fixedLength: true },
            '331': { name: 'Length/1st dimension (m)', type: 'numeric', length: 6, fixedLength: true },
            '332': { name: 'Width/diameter/2nd dimension (m)', type: 'numeric', length: 6, fixedLength: true },
            '333': { name: 'Depth/thickness/height/3rd dimension (m)', type: 'numeric', length: 6, fixedLength: true },
            '334': { name: 'Area (m²)', type: 'numeric', length: 6, fixedLength: true },
            '335': { name: 'Logistic volume (l)', type: 'numeric', length: 6, fixedLength: true },
            '336': { name: 'Logistic volume (m³)', type: 'numeric', length: 6, fixedLength: true },
            '340': { name: 'Logistic weight (lb)', type: 'numeric', length: 6, fixedLength: true },
            '341': { name: 'Length/1st dimension (in)', type: 'numeric', length: 6, fixedLength: true },
            '342': { name: 'Length/1st dimension (ft)', type: 'numeric', length: 6, fixedLength: true },
            '343': { name: 'Length/1st dimension (yd)', type: 'numeric', length: 6, fixedLength: true },
            '344': { name: 'Width/diameter/2nd dimension (in)', type: 'numeric', length: 6, fixedLength: true },
            '345': { name: 'Width/diameter/2nd dimension (ft)', type: 'numeric', length: 6, fixedLength: true },
            '346': { name: 'Width/diameter/2nd dimension (yd)', type: 'numeric', length: 6, fixedLength: true },
            '347': { name: 'Depth/thickness/height/3rd dimension (in)', type: 'numeric', length: 6, fixedLength: true },
            '348': { name: 'Depth/thickness/height/3rd dimension (ft)', type: 'numeric', length: 6, fixedLength: true },
            '349': { name: 'Depth/thickness/height/3rd dimension (yd)', type: 'numeric', length: 6, fixedLength: true },
            '350': { name: 'Area (in²)', type: 'numeric', length: 6, fixedLength: true },
            '351': { name: 'Area (ft²)', type: 'numeric', length: 6, fixedLength: true },
            '352': { name: 'Area (yd²)', type: 'numeric', length: 6, fixedLength: true },
            '353': { name: 'Area (in²)', type: 'numeric', length: 6, fixedLength: true },
            '354': { name: 'Area (ft²)', type: 'numeric', length: 6, fixedLength: true },
            '355': { name: 'Area (yd²)', type: 'numeric', length: 6, fixedLength: true },
            '356': { name: 'Net weight (oz tr)', type: 'numeric', length: 6, fixedLength: true },
            '357': { name: 'Net volume (fl oz)', type: 'numeric', length: 6, fixedLength: true },
            '360': { name: 'Net volume (qt)', type: 'numeric', length: 6, fixedLength: true },
            '361': { name: 'Net volume (gal)', type: 'numeric', length: 6, fixedLength: true },
            '362': { name: 'Logistic volume (qt)', type: 'numeric', length: 6, fixedLength: true },
            '363': { name: 'Logistic volume (gal)', type: 'numeric', length: 6, fixedLength: true },
            '364': { name: 'Net volume (in³)', type: 'numeric', length: 6, fixedLength: true },
            '365': { name: 'Net volume (ft³)', type: 'numeric', length: 6, fixedLength: true },
            '366': { name: 'Net volume (yd³)', type: 'numeric', length: 6, fixedLength: true },
            '367': { name: 'Logistic volume (in³)', type: 'numeric', length: 6, fixedLength: true },
            '368': { name: 'Logistic volume (ft³)', type: 'numeric', length: 6, fixedLength: true },
            '369': { name: 'Logistic volume (yd³)', type: 'numeric', length: 6, fixedLength: true },
            '37': { name: 'Count of trade items', type: 'numeric', length: 8, fixedLength: false },
            '390': { name: 'Applicable amount payable (local currency)', type: 'numeric', length: 15, fixedLength: false },
            '391': { name: 'Applicable amount payable with ISO currency code', type: 'numeric', length: 18, fixedLength: false },
            '392': { name: 'Applicable amount payable (single monetary area)', type: 'numeric', length: 15, fixedLength: false },
            '393': { name: 'Applicable amount payable with ISO currency code', type: 'numeric', length: 18, fixedLength: false },
            '394': { name: 'Percentage discount of applicable amount', type: 'numeric', length: 4, fixedLength: true },
            '400': { name: 'Customer purchase order number', type: 'alphanumeric', length: 30, fixedLength: false },
            '401': { name: 'Global Identification Number for Consignment', type: 'alphanumeric', length: 30, fixedLength: false },
            '402': { name: 'Global Shipment Identification Number', type: 'numeric', length: 17, fixedLength: true },
            '403': { name: 'Routing code', type: 'alphanumeric', length: 30, fixedLength: false },
            '410': { name: 'Ship to/Deliver to Global Location Number', type: 'numeric', length: 13, fixedLength: true },
            '411': { name: 'Bill to/Invoice to Global Location Number', type: 'numeric', length: 13, fixedLength: true },
            '412': { name: 'Purchased from Global Location Number', type: 'numeric', length: 13, fixedLength: true },
            '413': { name: 'Ship for/Deliver for/Forward to Global Location Number', type: 'numeric', length: 13, fixedLength: true },
            '414': { name: 'Identification of a physical location Global Location Number', type: 'numeric', length: 13, fixedLength: true },
            '415': { name: 'Global Location Number of the invoicing party', type: 'numeric', length: 13, fixedLength: true },
            '416': { name: 'GLN of the production or service location', type: 'numeric', length: 13, fixedLength: true },
            '417': { name: 'Party Global Location Number', type: 'numeric', length: 13, fixedLength: true },
            '420': { name: 'Ship to/Deliver to postal code within a single postal authority', type: 'alphanumeric', length: 20, fixedLength: false },
            '421': { name: 'Ship to/Deliver to postal code with three-digit ISO country code', type: 'alphanumeric', length: 12, fixedLength: false },
            '422': { name: 'Country of origin of a trade item', type: 'numeric', length: 3, fixedLength: true },
            '423': { name: 'Country of initial processing', type: 'numeric', length: 15, fixedLength: false },
            '424': { name: 'Country of processing', type: 'numeric', length: 3, fixedLength: true },
            '425': { name: 'Country of disassembly', type: 'numeric', length: 15, fixedLength: false },
            '426': { name: 'Country covering full process chain', type: 'numeric', length: 3, fixedLength: true },
            '427': { name: 'Country subdivision of origin', type: 'alphanumeric', length: 3, fixedLength: false },
            '7001': { name: 'NATO Stock Number', type: 'numeric', length: 13, fixedLength: true },
            '7002': { name: 'UN/ECE meat carcasses classification', type: 'alphanumeric', length: 30, fixedLength: false },
            '7003': { name: 'Expiration date and time', type: 'numeric', length: 10, fixedLength: true },
            '7004': { name: 'Active potency', type: 'numeric', length: 4, fixedLength: false },
            '7005': { name: 'Catch area', type: 'alphanumeric', length: 12, fixedLength: false },
            '7006': { name: 'First freeze date', type: 'numeric', length: 6, fixedLength: true },
            '7007': { name: 'Harvest date', type: 'numeric', length: 12, fixedLength: false },
            '7008': { name: 'Species for fishery purposes', type: 'alphanumeric', length: 3, fixedLength: false },
            '7009': { name: 'Fishing gear type', type: 'alphanumeric', length: 10, fixedLength: false },
            '7010': { name: 'Production method', type: 'alphanumeric', length: 2, fixedLength: false },
            '7020': { name: 'Refurbishment lot ID', type: 'alphanumeric', length: 20, fixedLength: false },
            '7021': { name: 'Functional status', type: 'alphanumeric', length: 20, fixedLength: false },
            '7022': { name: 'Revision status', type: 'alphanumeric', length: 20, fixedLength: false },
            '7023': { name: 'Global Individual Asset Identifier', type: 'alphanumeric', length: 30, fixedLength: false },
            '8001': { name: 'Roll products', type: 'numeric', length: 14, fixedLength: true },
            '8002': { name: 'Cellular mobile telephone identifier', type: 'alphanumeric', length: 20, fixedLength: false },
            '8003': { name: 'Global Returnable Asset Identifier', type: 'alphanumeric', length: 30, fixedLength: false },
            '8004': { name: 'Global Individual Asset Identifier', type: 'alphanumeric', length: 30, fixedLength: false },
            '8005': { name: 'Price per unit of measure', type: 'numeric', length: 6, fixedLength: true },
            '8006': { name: 'Identification of the components of a trade item', type: 'numeric', length: 18, fixedLength: true },
            '8007': { name: 'International Bank Account Number', type: 'alphanumeric', length: 34, fixedLength: false },
            '8008': { name: 'Date and time of production', type: 'numeric', length: 12, fixedLength: false },
            '8009': { name: 'Optically Readable Sensor Indicator', type: 'alphanumeric', length: 50, fixedLength: false },
            '8010': { name: 'Component/Part Identifier', type: 'alphanumeric', length: 30, fixedLength: false },
            '8011': { name: 'Component/Part Identifier serial number', type: 'numeric', length: 12, fixedLength: false },
            '8012': { name: 'Software version', type: 'alphanumeric', length: 20, fixedLength: false },
            '8013': { name: 'Global Model Number', type: 'alphanumeric', length: 30, fixedLength: false },
            '8017': { name: 'Global Service Relation Number to identify the relationship between an organisation offering services', type: 'numeric', length: 18, fixedLength: true },
            '8018': { name: 'Global Service Relation Number to identify the relationship between an organisation offering services', type: 'numeric', length: 18, fixedLength: true },
            '8019': { name: 'Service Relation Instance Number', type: 'numeric', length: 10, fixedLength: false },
            '8020': { name: 'Payment slip reference number', type: 'alphanumeric', length: 25, fixedLength: false },
            '8110': { name: 'Coupon code identification for use in North America', type: 'alphanumeric', length: 70, fixedLength: false },
            '8111': { name: 'Loyalty points of a coupon', type: 'numeric', length: 4, fixedLength: true },
            '8112': { name: 'Paperless coupon code identification for use in North America', type: 'alphanumeric', length: 70, fixedLength: false },
            '8200': { name: 'Extended packaging URL', type: 'alphanumeric', length: 70, fixedLength: false },
            '90': { name: 'Information mutually agreed between trading partners', type: 'alphanumeric', length: 30, fixedLength: false },
            '91': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '92': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '93': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '94': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '95': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '96': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '97': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '98': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false },
            '99': { name: 'Company internal information', type: 'alphanumeric', length: 90, fixedLength: false }
        };

        // Short codes mapping for Digital Link
        this.shortCodes = {
            '01': 'gtin',
            '10': 'lot',
            '11': 'prodDate',
            '12': 'dueDate',
            '13': 'packDate',
            '15': 'bestBefore',
            '16': 'sellBy',
            '17': 'expDate',
            '20': 'variant',
            '21': 'ser',
            '22': 'cpv',
            '240': 'addId',
            '241': 'custPartNo',
            '242': 'mtoVariant',
            '243': 'pcn',
            '250': 'secSer',
            '251': 'refToSource',
            '253': 'gdti',
            '254': 'glnExt',
            '255': 'gcn',
            '30': 'varCount',
            '310': 'netWeight',
            '311': 'length',
            '312': 'width',
            '313': 'height',
            '314': 'area',
            '315': 'netVol',
            '316': 'netVolM3',
            '320': 'netWeightLb',
            '321': 'lengthIn',
            '322': 'lengthFt',
            '323': 'lengthYd',
            '324': 'widthIn',
            '325': 'widthFt',
            '326': 'widthYd',
            '327': 'depthIn',
            '328': 'depthFt',
            '329': 'depthYd',
            '330': 'logWeight',
            '331': 'logLength',
            '332': 'logWidth',
            '333': 'logHeight',
            '334': 'logArea',
            '335': 'logVol',
            '336': 'logVolM3',
            '340': 'logWeightLb',
            '341': 'logLengthIn',
            '342': 'logLengthFt',
            '343': 'logLengthYd',
            '344': 'logWidthIn',
            '345': 'logWidthFt',
            '346': 'logWidthYd',
            '347': 'logDepthIn',
            '348': 'logDepthFt',
            '349': 'logDepthYd',
            '350': 'areaIn2',
            '351': 'areaFt2',
            '352': 'areaYd2',
            '353': 'logAreaIn2',
            '354': 'logAreaFt2',
            '355': 'logAreaYd2',
            '356': 'netWeightOz',
            '357': 'netVolFlOz',
            '360': 'netVolQt',
            '361': 'netVolGal',
            '362': 'logVolQt',
            '363': 'logVolGal',
            '364': 'netVolIn3',
            '365': 'netVolFt3',
            '366': 'netVolYd3',
            '367': 'logVolIn3',
            '368': 'logVolFt3',
            '369': 'logVolYd3',
            '37': 'count',
            '390': 'amount',
            '391': 'amountIso',
            '392': 'prcnt',
            '393': 'amountIso',
            '394': 'prcntOff',
            '400': 'orderNumber',
            '401': 'ginc',
            '402': 'gsin',
            '403': 'route',
            '410': 'shipTo',
            '411': 'billTo',
            '412': 'purchFrom',
            '413': 'shipFor',
            '414': 'locNo',
            '415': 'payTo',
            '416': 'prodServLoc',
            '417': 'party',
            '420': 'postcode',
            '421': 'postcodeIso',
            '422': 'origin',
            '423': 'countryInitProcess',
            '424': 'countryProcess',
            '425': 'countryDisassembly',
            '426': 'countryFullProcess',
            '427': 'subdivision',
            '7001': 'nsnNato',
            '7002': 'uneceMeat',
            '7003': 'expDateTime',
            '7004': 'activePotency',
            '7005': 'catchArea',
            '7006': 'firstFreezeDate',
            '7007': 'harvestDate',
            '7008': 'aquaticSpecies',
            '7009': 'fishingGearType',
            '7010': 'prodMethod',
            '7020': 'refurbLot',
            '7021': 'funcStat',
            '7022': 'revStat',
            '7023': 'giai',
            '8001': 'rollProd',
            '8002': 'cmtNo',
            '8003': 'grai',
            '8004': 'giai',
            '8005': 'ppum',
            '8006': 'itip',
            '8007': 'iban',
            '8008': 'prodTime',
            '8009': 'optsen',
            '8010': 'cpid',
            '8011': 'cpidSerial',
            '8012': 'version',
            '8013': 'gmn',
            '8017': 'gsrn',
            '8018': 'gsrnProvider',
            '8019': 'srin',
            '8020': 'refNo',
            '8110': 'couponCodeNa',
            '8111': 'points',
            '8112': 'paperlessCouponCodeNa',
            '8200': 'extendedPackaging',
            '90': 'internal1',
            '91': 'internal2',
            '92': 'internal3',
            '93': 'internal4',
            '94': 'internal5',
            '95': 'internal6',
            '96': 'internal7',
            '97': 'internal8',
            '98': 'internal9',
            '99': 'internal10'
        };

        // Reverse mapping for extracting data
        this.reverseShortCodes = {};
        for (const [ai, shortCode] of Object.entries(this.shortCodes)) {
            this.reverseShortCodes[shortCode] = ai;
        }

        // Primary keys for Digital Link
        this.primaryKeys = ['01', '8003', '8004', '402'];
    }

    /**
     * Validate GS1 Data
     * @param {Object} gs1Data - Object with AI as keys and values
     * @returns {Object} Validation result
     */
    validateGS1Data(gs1Data) {
        const result = {
            valid: true,
            errors: [],
            warnings: []
        };

        if (!gs1Data || typeof gs1Data !== 'object') {
            result.valid = false;
            result.errors.push('GS1-Daten müssen als Objekt übergeben werden');
            return result;
        }

        // Check if at least one primary key is present
        const hasPrimaryKey = this.primaryKeys.some(key => gs1Data[key]);
        if (!hasPrimaryKey) {
            result.valid = false;
            result.errors.push('Mindestens ein Primärschlüssel (GTIN, GRAI, GIAI, GSIN) ist erforderlich');
        }

        // Validate each AI
        for (const [ai, value] of Object.entries(gs1Data)) {
            const aiDef = this.aiDefinitions[ai];
            
            if (!aiDef) {
                result.warnings.push(`Unbekannter Application Identifier: ${ai}`);
                continue;
            }

            if (!value || value.toString().length === 0) {
                result.errors.push(`Wert für AI ${ai} (${aiDef.name}) darf nicht leer sein`);
                result.valid = false;
                continue;
            }

            const valueStr = value.toString();

            // Check length
            if (aiDef.fixedLength) {
                if (valueStr.length !== aiDef.length) {
                    result.errors.push(`AI ${ai} (${aiDef.name}) muss genau ${aiDef.length} Zeichen haben, hat aber ${valueStr.length}`);
                    result.valid = false;
                }
            } else {
                if (valueStr.length > aiDef.length) {
                    result.errors.push(`AI ${ai} (${aiDef.name}) darf maximal ${aiDef.length} Zeichen haben, hat aber ${valueStr.length}`);
                    result.valid = false;
                }
            }

            // Check type
            if (aiDef.type === 'numeric' && !/^\d+$/.test(valueStr)) {
                result.errors.push(`AI ${ai} (${aiDef.name}) darf nur Ziffern enthalten`);
                result.valid = false;
            }

            // Special validations
            if (ai === '01') {
                const gtinValidation = this.validateGTIN(valueStr);
                if (!gtinValidation.valid) {
                    result.errors.push(`GTIN-Validierung fehlgeschlagen: ${gtinValidation.error}`);
                    result.valid = false;
                }
            }

            if (ai === '17' || ai === '11' || ai === '12' || ai === '13' || ai === '15' || ai === '16') {
                const dateValidation = this.validateDate(valueStr);
                if (!dateValidation.valid) {
                    result.errors.push(`Datum-Validierung für AI ${ai} fehlgeschlagen: ${dateValidation.error}`);
                    result.valid = false;
                }
            }
        }

        return result;
    }

    /**
     * Validate GTIN with check digit
     * @param {string} gtin - GTIN to validate
     * @returns {Object} Validation result
     */
    validateGTIN(gtin) {
        if (!gtin || typeof gtin !== 'string') {
            return { valid: false, error: 'GTIN muss als String übergeben werden' };
        }

        // Remove any non-digit characters
        const cleanGtin = gtin.replace(/\D/g, '');

        // Check length
        if (!/^(\d{8}|\d{12}|\d{13}|\d{14})$/.test(cleanGtin)) {
            return { valid: false, error: 'GTIN muss 8, 12, 13 oder 14 Ziffern haben' };
        }

        // Pad to 14 digits for check digit calculation
        const paddedGtin = cleanGtin.padStart(14, '0');
        
        // Calculate check digit
        const checkDigit = this.calculateGTINCheckDigit(paddedGtin.substr(0, 13));
        
        if (parseInt(paddedGtin.charAt(13)) !== checkDigit) {
            return { valid: false, error: 'GTIN-Prüfziffer ist ungültig' };
        }

        return { valid: true };
    }

    /**
     * Calculate GTIN check digit
     * @param {string} gtin13 - First 13 digits of GTIN
     * @returns {number} Check digit
     */
    calculateGTINCheckDigit(gtin13) {
        let sum = 0;
        for (let i = 0; i < 13; i++) {
            const digit = parseInt(gtin13.charAt(i));
            sum += digit * (i % 2 === 0 ? 1 : 3);
        }
        return (10 - (sum % 10)) % 10;
    }

    /**
     * Validate date in YYMMDD format
     * @param {string} dateStr - Date string in YYMMDD format
     * @returns {Object} Validation result
     */
    validateDate(dateStr) {
        if (!dateStr || dateStr.length !== 6) {
            return { valid: false, error: 'Datum muss im Format YYMMDD sein' };
        }

        if (!/^\d{6}$/.test(dateStr)) {
            return { valid: false, error: 'Datum darf nur Ziffern enthalten' };
        }

        const year = parseInt(dateStr.substr(0, 2));
        const month = parseInt(dateStr.substr(2, 2));
        const day = parseInt(dateStr.substr(4, 2));

        if (month < 1 || month > 12) {
            return { valid: false, error: 'Ungültiger Monat' };
        }

        if (day < 1 || day > 31) {
            return { valid: false, error: 'Ungültiger Tag' };
        }

        // More detailed date validation
        const fullYear = year < 50 ? 2000 + year : 1900 + year;
        const date = new Date(fullYear, month - 1, day);
        
        if (date.getFullYear() !== fullYear || 
            date.getMonth() !== month - 1 || 
            date.getDate() !== day) {
            return { valid: false, error: 'Ungültiges Datum' };
        }

        return { valid: true };
    }

    /**
     * Build GS1 Digital Link
     * @param {Object} gs1Data - GS1 data object
     * @param {boolean} useShortCodes - Whether to use short codes
     * @param {string} domain - Domain for the Digital Link
     * @returns {string} GS1 Digital Link URL
     */
    buildGS1digitalLink(gs1Data, useShortCodes = false, domain = 'https://id.gs1.org') {
        if (!gs1Data || typeof gs1Data !== 'object') {
            throw new Error('GS1-Daten sind erforderlich');
        }

        // Find primary key
        const primaryKey = this.primaryKeys.find(key => gs1Data[key]);
        if (!primaryKey) {
            throw new Error('Mindestens ein Primärschlüssel ist erforderlich');
        }

        // Clean domain
        const cleanDomain = domain.replace(/\/$/, '');
        
        // Start building URL
        let url = cleanDomain;
        
        // Add primary key to path
        if (useShortCodes && this.shortCodes[primaryKey]) {
            url += `/${this.shortCodes[primaryKey]}/${gs1Data[primaryKey]}`;
        } else {
            url += `/${primaryKey}/${gs1Data[primaryKey]}`;
        }

        // Add other data as query parameters
        const queryParams = [];
        for (const [ai, value] of Object.entries(gs1Data)) {
            if (ai !== primaryKey) {
                const key = useShortCodes && this.shortCodes[ai] ? this.shortCodes[ai] : ai;
                queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
        }

        if (queryParams.length > 0) {
            url += '?' + queryParams.join('&');
        }

        return url;
    }

    /**
     * Build GS1 Element Strings
     * @param {Object} gs1Data - GS1 data object
     * @param {boolean} humanReadable - Whether to return human-readable format with brackets
     * @returns {string} GS1 Element String
     */
    buildGS1elementStrings(gs1Data, humanReadable = true) {
        if (!gs1Data || typeof gs1Data !== 'object') {
            throw new Error('GS1-Daten sind erforderlich');
        }

        const elements = [];
        
        // Sort AIs for consistent output (primary keys first)
        const sortedAIs = Object.keys(gs1Data).sort((a, b) => {
            const aPrimary = this.primaryKeys.includes(a);
            const bPrimary = this.primaryKeys.includes(b);
            
            if (aPrimary && !bPrimary) return -1;
            if (!aPrimary && bPrimary) return 1;
            
            return a.localeCompare(b);
        });

        for (const ai of sortedAIs) {
            const value = gs1Data[ai];
            const aiDef = this.aiDefinitions[ai];
            
            if (humanReadable) {
                elements.push(`(${ai})${value}`);
            } else {
                // Add FNC1 (Group Separator) after variable-length fields
                if (aiDef && !aiDef.fixedLength && ai !== sortedAIs[sortedAIs.length - 1]) {
                    elements.push(`${ai}${value}\x1D`);
                } else {
                    elements.push(`${ai}${value}`);
                }
            }
        }

        return elements.join('');
    }

    /**
     * Extract data from GS1 Digital Link
     * @param {string} digitalLink - GS1 Digital Link URL
     * @returns {Object} Extracted GS1 data
     */
    extractFromGS1digitalLink(digitalLink) {
        try {
            const url = new URL(digitalLink);
            const pathParts = url.pathname.split('/').filter(part => part.length > 0);
            const result = {
                GS1: {},
                other: {}
            };

            // Extract primary key from path
            if (pathParts.length >= 2) {
                const keyOrAI = pathParts[0];
                const value = pathParts[1];
                
                // Check if it's a short code or AI
                const ai = this.reverseShortCodes[keyOrAI] || keyOrAI;
                
                if (this.aiDefinitions[ai]) {
                    result.GS1[ai] = value;
                } else {
                    result.other[keyOrAI] = value;
                }
            }

            // Extract query parameters
            for (const [key, value] of url.searchParams.entries()) {
                const ai = this.reverseShortCodes[key] || key;
                
                if (this.aiDefinitions[ai]) {
                    result.GS1[ai] = value;
                } else {
                    result.other[key] = value;
                }
            }

            return result;
        } catch (error) {
            throw new Error('Ungültige Digital Link URL: ' + error.message);
        }
    }

    /**
     * Parse GS1 Element String
     * @param {string} elementString - GS1 Element String
     * @returns {Object} Parsed GS1 data
     */
    parseElementString(elementString) {
        if (!elementString || typeof elementString !== 'string') {
            throw new Error('Element String ist erforderlich');
        }

        const result = {};
        let position = 0;
        
        // Remove brackets if present (human-readable format)
        let cleanString = elementString.replace(/[()]/g, '');
        
        while (position < cleanString.length) {
            // Find the AI
            let ai = '';
            let foundAI = false;
            
            // Try different AI lengths (2-4 characters)
            for (let aiLength = 2; aiLength <= 4 && position + aiLength <= cleanString.length; aiLength++) {
                const testAI = cleanString.substr(position, aiLength);
                if (this.aiDefinitions[testAI]) {
                    ai = testAI;
                    foundAI = true;
                    break;
                }
            }
            
            if (!foundAI) {
                throw new Error(`Unbekannter Application Identifier an Position ${position}`);
            }
            
            position += ai.length;
            const aiDef = this.aiDefinitions[ai];
            
            // Extract value
            let value = '';
            if (aiDef.fixedLength) {
                // Fixed length - take exactly the required number of characters
                if (position + aiDef.length > cleanString.length) {
                    throw new Error(`Nicht genügend Zeichen für AI ${ai} an Position ${position}`);
                }
                value = cleanString.substr(position, aiDef.length);
                position += aiDef.length;
            } else {
                // Variable length - find next AI or GS character or end of string
                let nextAIPosition = cleanString.length;
                
                // Look for Group Separator (FNC1)
                const gsPosition = cleanString.indexOf('\x1D', position);
                if (gsPosition !== -1) {
                    nextAIPosition = gsPosition;
                }
                
                // Look for next AI
                for (let i = position + 1; i < cleanString.length; i++) {
                    for (let aiLength = 2; aiLength <= 4; aiLength++) {
                        if (i + aiLength <= cleanString.length) {
                            const testAI = cleanString.substr(i, aiLength);
                            if (this.aiDefinitions[testAI]) {
                                nextAIPosition = Math.min(nextAIPosition, i);
                                break;
                            }
                        }
                    }
                }
                
                value = cleanString.substring(position, nextAIPosition);
                position = nextAIPosition;
                
                // Skip Group Separator if present
                if (position < cleanString.length && cleanString.charAt(position) === '\x1D') {
                    position++;
                }
            }
            
            if (value.length === 0) {
                throw new Error(`Leerer Wert für AI ${ai}`);
            }
            
            result[ai] = value;
        }
        
        return result;
    }

    /**
     * Generate examples for different industries
     * @param {string} industry - Industry type
     * @returns {Object} Example GS1 data
     */
    generateExample(industry) {
        const examples = {
            pharmaceutical: {
                '01': '04012345123456',
                '17': '251231',
                '10': 'ABC123',
                '21': '12345'
            },
            food: {
                '01': '04012345678904',
                '17': '260630',
                '10': 'LOT2024001'
            },
            electronics: {
                '01': '04012345789012',
                '21': 'SN987654321',
                '10': 'BATCH789'
            },
            automotive: {
                '01': '04012345890123',
                '21': 'VIN123456789',
                '10': 'P240115'
            },
            textile: {
                '01': '04012345901234',
                '10': 'FAB2024',
                '22': 'SIZE-M-BLUE'
            }
        };

        return examples[industry] || examples.pharmaceutical;
    }

    /**
     * Format date for display
     * @param {string} dateStr - Date in YYMMDD format
     * @returns {string} Formatted date
     */
    formatDate(dateStr) {
        if (!dateStr || dateStr.length !== 6) {
            return dateStr;
        }

        const year = parseInt(dateStr.substr(0, 2));
        const month = dateStr.substr(2, 2);
        const day = dateStr.substr(4, 2);
        const fullYear = year < 50 ? 2000 + year : 1900 + year;

        return `${day}.${month}.${fullYear}`;
    }

    /**
     * Get AI description
     * @param {string} ai - Application Identifier
     * @returns {string} Human-readable description
     */
    getAIDescription(ai) {
        const aiDef = this.aiDefinitions[ai];
        return aiDef ? aiDef.name : `Unbekannter AI: ${ai}`;
    }

    /**
     * Convert date from various formats to YYMMDD
     * @param {string|Date} input - Input date
     * @returns {string} Date in YYMMDD format
     */
    convertToYYMMDD(input) {
        let date;
        
        if (input instanceof Date) {
            date = input;
        } else if (typeof input === 'string') {
            // Try to parse different formats
            if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
                // YYYY-MM-DD format
                date = new Date(input);
            } else if (/^\d{2}\.\d{2}\.\d{4}$/.test(input)) {
                // DD.MM.YYYY format
                const parts = input.split('.');
                date = new Date(parts[2], parts[1] - 1, parts[0]);
            } else if (/^\d{6}$/.test(input)) {
                // Already in YYMMDD format
                return input;
            } else {
                date = new Date(input);
            }
        } else {
            throw new Error('Ungültiges Datumsformat');
        }

        if (isNaN(date.getTime())) {
            throw new Error('Ungültiges Datum');
        }

        const year = date.getFullYear().toString().substr(2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return year + month + day;
    }

    /**
     * Validate and normalize GTIN
     * @param {string} gtin - Input GTIN
     * @returns {string} Normalized GTIN (14 digits)
     */
    normalizeGTIN(gtin) {
        if (!gtin) {
            throw new Error('GTIN ist erforderlich');
        }

        const cleanGtin = gtin.replace(/\D/g, '');
        
        if (!/^(\d{8}|\d{12}|\d{13}|\d{14})$/.test(cleanGtin)) {
            throw new Error('GTIN muss 8, 12, 13 oder 14 Ziffern haben');
        }

        // Pad to 14 digits
        const paddedGtin = cleanGtin.padStart(14, '0');
        
        // Validate check digit
        const validation = this.validateGTIN(paddedGtin);
        if (!validation.valid) {
            throw new Error(validation.error);
        }

        return paddedGtin;
    }

    /**
     * Generate QR code-friendly data
     * @param {Object} gs1Data - GS1 data object
     * @returns {string} QR code data string
     */
    generateQRData(gs1Data) {
        // For QR codes, we typically use the element string without brackets
        return this.buildGS1elementStrings(gs1Data, false);
    }

    /**
     * Check if AI requires FNC1
     * @param {string} ai - Application Identifier
     * @returns {boolean} True if FNC1 is required
     */
    requiresFNC1(ai) {
        const aiDef = this.aiDefinitions[ai];
        return aiDef ? !aiDef.fixedLength : false;
    }

    /**
     * Get all available AIs
     * @returns {Array} Array of AI definitions
     */
    getAllAIs() {
        return Object.entries(this.aiDefinitions).map(([ai, def]) => ({
            ai,
            ...def
        }));
    }

    /**
     * Validate complete GS1 structure
     * @param {Object} gs1Data - GS1 data object
     * @returns {Object} Detailed validation result
     */
    validateComplete(gs1Data) {
        const result = this.validateGS1Data(gs1Data);
        
        // Additional business rule validations
        if (result.valid) {
            // Check for logical combinations
            if (gs1Data['17'] && gs1Data['15']) {
                result.warnings.push('Sowohl Ablaufdatum (17) als auch Mindesthaltbarkeitsdatum (15) sind gesetzt');
            }
            
            if (gs1Data['11'] && gs1Data['13']) {
                const prodDate = gs1Data['11'];
                const packDate = gs1Data['13'];
                if (prodDate > packDate) {
                    result.warnings.push('Produktionsdatum liegt nach Verpackungsdatum');
                }
            }
        }
        
        return result;
    }

    /**
     * Convert GS1 data to different formats
     * @param {Object} gs1Data - GS1 data object
     * @param {string} format - Output format (json, xml, csv)
     * @returns {string} Formatted output
     */
    convertToFormat(gs1Data, format) {
        switch (format.toLowerCase()) {
            case 'json':
                return JSON.stringify(gs1Data, null, 2);
                
            case 'xml':
                let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<gs1Data>\n';
                for (const [ai, value] of Object.entries(gs1Data)) {
                    const aiDef = this.aiDefinitions[ai];
                    const name = aiDef ? aiDef.name.replace(/[^a-zA-Z0-9]/g, '') : `AI_${ai}`;
                    xml += `  <${name} ai="${ai}">${this.escapeXml(value)}</${name}>\n`;
                }
                xml += '</gs1Data>';
                return xml;
                
            case 'csv':
                const headers = ['AI', 'Name', 'Value'];
                const rows = [headers.join(',')];
                for (const [ai, value] of Object.entries(gs1Data)) {
                    const name = this.getAIDescription(ai);
                    rows.push(`"${ai}","${name}","${value}"`);
                }
                return rows.join('\n');
                
            default:
                throw new Error('Unbekanntes Format: ' + format);
        }
    }

    /**
     * Escape XML special characters
     * @param {string} str - String to escape
     * @returns {string} Escaped string
     */
    escapeXml(str) {
        return str.toString()
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    /**
     * Generate sample data for testing
     * @returns {Object} Sample GS1 data
     */
    generateSampleData() {
        const today = new Date();
        const expiry = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year from now
        
        return {
            '01': '04012345123456',
            '17': this.convertToYYMMDD(expiry),
            '10': 'SAMPLE' + Date.now().toString().substr(-4),
            '21': 'SER' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GS1DigitalLinkToolkit;
}

// Make available globally in browser
if (typeof window !== 'undefined') {
    window.GS1DigitalLinkToolkit = GS1DigitalLinkToolkit;
}

// Initialize examples data
const loadExample = (industry) => {
    const toolkit = new GS1DigitalLinkToolkit();
    const example = toolkit.generateExample(industry);
    
    // Load example data into form
    if (example['01']) document.getElementById('gtin').value = example['01'];
    if (example['10']) document.getElementById('batch').value = example['10'];
    if (example['21']) document.getElementById('serial').value = example['21'];
    if (example['22']) document.getElementById('batch').value = example['22']; // Use batch field for variant
    
    if (example['17']) {
        // Convert YYMMDD to YYYY-MM-DD for date input
        const dateStr = example['17'];
        if (dateStr.length === 6) {
            const year = parseInt(dateStr.substr(0, 2));
            const month = dateStr.substr(2, 2);
            const day = dateStr.substr(4, 2);
            const fullYear = year < 50 ? 2000 + year : 1900 + year;
            document.getElementById('expiry').value = `${fullYear}-${month}-${day}`;
        }
    }
    
    // Show success message
    if (typeof showSuccess === 'function') {
        showSuccess(`${industry.charAt(0).toUpperCase() + industry.slice(1)} Beispiel geladen`);
    }
};

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            console.log('✅ GS1 Digital Link Toolkit initialized');
        });
    } else {
        console.log('✅ GS1 Digital Link Toolkit ready');
    }
}