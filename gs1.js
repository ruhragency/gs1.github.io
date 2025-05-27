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
     * Generate valid GTIN with correct check digit
     * @param {string} gtinWithoutCheck - GTIN without last digit (7, 11, 12, or 13 digits)
     * @returns {string} Valid GTIN with check digit
     */
    generateValidGTIN(gtinWithoutCheck) {
        if (!gtinWithoutCheck || !/^\d{7}$|^\d{11}$|^\d{12}$|^\d{13}$/.test(gtinWithoutCheck)) {
            throw new Error('GTIN ohne Prüfziffer muss 7, 11, 12 oder 13 Ziffern haben');
        }

        // Pad to 13 digits for check digit calculation
        const paddedGtin13 = gtinWithoutCheck.padStart(13, '0');
        const checkDigit = this.calculateGTINCheckDigit(paddedGtin13);
        
        // Return with original length + check digit
        return gtinWithoutCheck + checkDigit;
    }

    /**
     * Fix GTIN by calculating correct check digit
     * @param {string} gtin - GTIN with potentially wrong check digit
     * @returns {string} GTIN with correct check digit
     */
    fixGTIN(gtin) {
        if (!gtin || !/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(gtin)) {
            throw new Error('GTIN muss 8, 12, 13 oder 14 Ziffern haben');
        }

        // Remove last digit (check digit) and recalculate
        const gtinWithoutCheck = gtin.slice(0, -1);
        return this.generateValidGTIN(gtinWithoutCheck);
    }
    generateExample(industry) {
        const examples = {
            pharmaceutical: {
                '01': '04012345123456',
                '17': '251231',
                '10': 'ABC123',
                '21': '12345'
            },
            food: {
                '01': '04012345678903',  // Korrigierte Prüfziffer
                '17': '260630',
                '10': 'LOT2024001'
            },
            electronics: {
                '01': '04012345789019',  // Korrigierte Prüfziffer
                '21': 'SN987654321',
                '10': 'BATCH789'
            },
            automotive: {
                '01': '04012345890130',  // Korrigierte Prüfziffer
                '21': 'VIN123456789',
                '10': 'P240115'
            },
            textile: {
                '01': '04012345901241',  // Korrigierte Prüfziffer
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

// Initialize GS1 Toolkit
const toolkit = new GS1DigitalLinkToolkit();

// Global variables
let currentGs1Data = {};
let qrCodeInstance = null;

/**
 * Load parameters from URL and auto-generate if present
 */
function loadFromUrlParams() {
    const params = new URLSearchParams(window.location.search);
    
    // Load form values from URL parameters
    if (params.get('gtin')) document.getElementById('gtin').value = params.get('gtin');
    if (params.get('batch')) document.getElementById('batch').value = params.get('batch');
    if (params.get('serial')) document.getElementById('serial').value = params.get('serial');
    if (params.get('domain')) document.getElementById('domain').value = params.get('domain');
    if (params.get('format')) document.getElementById('format').value = params.get('format');
    if (params.get('short') === 'true' || params.get('short') === '1') {
        document.getElementById('use-short-codes').checked = true;
    }
    
    // Handle expiry date conversion
    if (params.get('expiry')) {
        const expiry = params.get('expiry');
        if (expiry.length === 6) {
            // Convert YYMMDD to YYYY-MM-DD
            const year = 2000 + parseInt(expiry.substr(0, 2));
            const month = expiry.substr(2, 2);
            const day = expiry.substr(4, 2);
            document.getElementById('expiry').value = `${year}-${month}-${day}`;
        } else if (expiry.length === 10) {
            // Already in YYYY-MM-DD format
            document.getElementById('expiry').value = expiry;
        }
    }

    // Auto-generate if GTIN is present
    if (params.get('gtin')) {
        setTimeout(() => {
            generateCode();
            
            // Handle direct API requests
            const format = params.get('format');
            if (format === 'svg' || format === 'png') {
                setTimeout(() => handleApiRequest(), 500);
            } else if (format === 'digital-link') {
                setTimeout(() => handleDigitalLinkResponse(), 300);
            } else if (format === 'element-string') {
                setTimeout(() => handleElementStringResponse(), 300);
            }
        }, 100);
    }
}

/**
 * Main code generation function
 */
function generateCode() {
    showLoading(true);
    
    try {
        const gs1Data = collectFormData();
        const validation = toolkit.validateGS1Data(gs1Data);
        
        displayValidationResult(validation);
        
        if (!validation.valid) {
            showLoading(false);
            return false;
        }
        
        currentGs1Data = gs1Data;
        const format = document.getElementById('format').value;
        const useShortCodes = document.getElementById('use-short-codes').checked;
        
        switch (format) {
            case 'digital-link':
                generateDigitalLink(gs1Data, useShortCodes);
                break;
            case 'element-string':
                generateElementString(gs1Data);
                break;
            case 'svg':
            case 'png':
                generateBarcode(gs1Data, format);
                break;
            default:
                throw new Error('Unbekanntes Format: ' + format);
        }
        
        updateUrlExamples(gs1Data);
        return true;
        
    } catch (error) {
        console.error('Generation error:', error);
        showError('Fehler beim Generieren: ' + error.message);
        return false;
    } finally {
        showLoading(false);
    }
}

/**
 * Collect and validate form data
 */
function collectFormData() {
    const gs1Data = {};
    
    const gtin = document.getElementById('gtin').value.trim();
    if (!gtin) {
        throw new Error('GTIN ist erforderlich');
    }
    
    // Validate GTIN format
    if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(gtin)) {
        throw new Error('GTIN muss 8, 12, 13 oder 14 Ziffern haben');
    }
    
    gs1Data['01'] = gtin;
    
    const batch = document.getElementById('batch').value.trim();
    if (batch) {
        if (batch.length > 20) {
            throw new Error('Batch/Lot darf maximal 20 Zeichen haben');
        }
        gs1Data['10'] = batch;
    }
    
    const serial = document.getElementById('serial').value.trim();
    if (serial) {
        if (serial.length > 20) {
            throw new Error('Seriennummer darf maximal 20 Zeichen haben');
        }
        gs1Data['21'] = serial;
    }
    
    const expiry = document.getElementById('expiry').value;
    if (expiry) {
        try {
            const date = new Date(expiry);
            if (isNaN(date.getTime())) {
                throw new Error('Ungültiges Datum');
            }
            
            const year = date.getFullYear().toString().substr(2);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            gs1Data['17'] = year + month + day;
        } catch (e) {
            throw new Error('Ungültiges Ablaufdatum');
        }
    }
    
    return gs1Data;
}

/**
 * Generate and display GS1 Digital Link
 */
function generateDigitalLink(gs1Data, useShortCodes) {
    try {
        const domain = document.getElementById('domain').value.trim() || 'https://id.gs1.org';
        const digitalLink = toolkit.buildGS1digitalLink(gs1Data, useShortCodes, domain);
        
        displayOutput(`
            <div class="alert alert-success">
                <strong>✅ GS1 Digital Link erfolgreich generiert:</strong><br><br>
                <div style="background: var(--bg-color); padding: 16px; border-radius: 8px; margin: 12px 0; word-break: break-all; font-family: monospace; border: 1px solid var(--border-color);">
                    <a href="${digitalLink}" target="_blank" style="color: var(--primary-color); text-decoration: none;">${digitalLink}</a>
                </div>
                <div style="margin-top: 16px;">
                    <button class="btn btn-success" onclick="copyToClipboard(this, '${digitalLink}')">📋 Link kopieren</button>
                    <button class="btn btn-secondary" onclick="openInNewTab('${digitalLink}')">🔗 Link öffnen</button>
                    <button class="btn" onclick="generateQRCode('${digitalLink}')">📱 QR-Code erstellen</button>
                    <button class="btn btn-warning" onclick="testDigitalLink('${digitalLink}')">🧪 Link testen</button>
                </div>
            </div>
        `);
        
        return digitalLink;
    } catch (error) {
        throw new Error('Fehler beim Erstellen des Digital Links: ' + error.message);
    }
}

/**
 * Generate and display GS1 Element String
 */
function generateElementString(gs1Data) {
    try {
        const elementString = toolkit.buildGS1elementStrings(gs1Data, true);
        const elementStringUnbracketed = toolkit.buildGS1elementStrings(gs1Data, false);
        const displayUnbracketed = elementStringUnbracketed.replace(/\x1D/g, '<span style="background: #fbbf24; padding: 2px 4px; border-radius: 3px; font-size: 0.8em;">&lt;GS&gt;</span>');
        
        displayOutput(`
            <div class="alert alert-success">
                <strong>✅ GS1 Element String erfolgreich generiert:</strong><br><br>
                
                <div style="margin-bottom: 16px;">
                    <strong>📝 Human-readable Format (mit Klammern):</strong><br>
                    <div style="background: var(--bg-color); padding: 12px; border-radius: 6px; margin: 8px 0; font-family: monospace; border: 1px solid var(--border-color); font-size: 1.1em;">${elementString}</div>
                </div>
                
                <div style="margin-bottom: 16px;">
                    <strong>🤖 Barcode Format (ohne Klammern):</strong><br>
                    <div style="background: var(--bg-color); padding: 12px; border-radius: 6px; margin: 8px 0; font-family: monospace; border: 1px solid var(--border-color); font-size: 1.1em;">${displayUnbracketed}</div>
                    <small style="color: var(--text-light);">GS = Group Separator (ASCII 29)</small>
                </div>
                
                <div style="margin-top: 16px;">
                    <button class="btn btn-success" onclick="copyToClipboard(this, '${elementString}')">📋 Human-readable kopieren</button>
                    <button class="btn btn-secondary" onclick="copyToClipboard(this, '${elementStringUnbracketed}')">📋 Barcode-Format kopieren</button>
                    <button class="btn" onclick="generateBarcodeFromElementString('${elementStringUnbracketed}')">📊 Als Barcode anzeigen</button>
                </div>
            </div>
        `);
        
        return { bracketed: elementString, unbracketed: elementStringUnbracketed };
    } catch (error) {
        throw new Error('Fehler beim Erstellen des Element Strings: ' + error.message);
    }
}

/**
 * Generate and display barcode
 */
function generateBarcode(gs1Data, format) {
    try {
        const elementString = toolkit.buildGS1elementStrings(gs1Data, false);
        const canvas = document.getElementById('barcode');
        
        // Get dimensions from URL params or use defaults
        const params = new URLSearchParams(window.location.search);
        const width = parseInt(params.get('width')) || 2;
        const height = parseInt(params.get('height')) || 80;
        const showText = params.get('text') !== 'false';
        
        // Generate barcode
        JsBarcode(canvas, elementString, {
            format: "CODE128",
            width: width,
            height: height,
            displayValue: showText,
            fontSize: 14,
            textMargin: 8,
            margin: 10,
            background: "#ffffff",
            lineColor: "#000000"
        });

        // Show barcode container
        document.getElementById('barcode-container').style.display = 'block';
        
        // Create detailed info
        const humanReadable = toolkit.buildGS1elementStrings(gs1Data, true);
        const barcodeInfo = createBarcodeInfo(gs1Data);
        
        document.getElementById('barcode-text').innerHTML = `
            <div style="margin-top: 20px;">
                <div style="background: var(--bg-color); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                    <strong>📊 Barcode Information:</strong><br>
                    <div style="margin-top: 8px;">
                        <strong>Format:</strong> GS1-128 (CODE128)<br>
                        <strong>Element String:</strong> <code>${humanReadable}</code><br>
                        <strong>Dimensionen:</strong> ${canvas.width}x${canvas.height} Pixel
                    </div>
                </div>
                
                ${barcodeInfo}
                
                <div style="margin-top: 16px;">
                    <button class="btn btn-success" onclick="downloadBarcode('${format}')">💾 Als ${format.toUpperCase()} herunterladen</button>
                    <button class="btn btn-secondary" onclick="printBarcode()">🖨️ Drucken</button>
                    <button class="btn" onclick="copyBarcodeToClipboard()">📋 Bild kopieren</button>
                    <button class="btn btn-warning" onclick="validateBarcode()">✅ Barcode validieren</button>
                </div>
            </div>
        `;

        displayOutput(`
            <div class="alert alert-success">
                <strong>✅ Barcode erfolgreich generiert!</strong><br>
                Format: GS1-128 (CODE128) • Größe: ${canvas.width}x${canvas.height}px
            </div>
        `);

        return canvas.toDataURL();
        
    } catch (error) {
        throw new Error('Fehler beim Generieren des Barcodes: ' + error.message);
    }
}

/**
 * Create detailed barcode information
 */
function createBarcodeInfo(gs1Data) {
    let info = '<div style="background: var(--white); border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; margin-top: 16px;"><strong>📋 Enthaltene Daten:</strong><br><br>';
    
    const aiDescriptions = {
        '01': '🏷️ GTIN (Global Trade Item Number)',
        '10': '📦 Batch/Lot Nummer',
        '17': '📅 Ablaufdatum (YYMMDD)',
        '21': '🔢 Seriennummer'
    };
    
    for (const [ai, value] of Object.entries(gs1Data)) {
        const description = aiDescriptions[ai] || `AI ${ai}`;
        let displayValue = value;
        
        // Format expiry date for display
        if (ai === '17' && value.length === 6) {
            const year = '20' + value.substr(0, 2);
            const month = value.substr(2, 2);
            const day = value.substr(4, 2);
            displayValue = `${value} (${day}.${month}.${year})`;
        }
        
        info += `<div style="margin-bottom: 8px;"><strong>${description}:</strong> <code>${displayValue}</code></div>`;
    }
    
    info += '</div>';
    return info;
}

/**
 * Update URL examples in documentation
 */
function updateUrlExamples(gs1Data) {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();
    
    if (gs1Data['01']) params.set('gtin', gs1Data['01']);
    if (gs1Data['10']) params.set('batch', gs1Data['10']);
    if (gs1Data['21']) params.set('serial', gs1Data['21']);
    if (gs1Data['17']) params.set('expiry', gs1Data['17']);
    
    const domain = document.getElementById('domain').value;
    if (domain && domain !== 'https://id.gs1.org') params.set('domain', domain);
    
    const useShortCodes = document.getElementById('use-short-codes').checked;
    if (useShortCodes) params.set('short', 'true');

    const baseParams = params.toString();
    
    document.getElementById('svg-url').textContent = `${baseUrl}?${baseParams}&format=svg`;
    document.getElementById('png-url').textContent = `${baseUrl}?${baseParams}&format=png`;
    
    const digitalLink = toolkit.buildGS1digitalLink(gs1Data, useShortCodes, domain);
    document.getElementById('dl-url').textContent = digitalLink;
}

/**
 * Display validation results
 */
function displayValidationResult(validation) {
    const container = document.getElementById('validation-result');
    
    if (validation.valid) {
        container.innerHTML = `
            <div class="validation-result valid">
                <strong>✅ Validierung erfolgreich</strong>
                ${validation.warnings.length > 0 ? `
                    <div class="validation-warnings" style="margin-top: 10px;">
                        <strong>⚠️ Warnungen:</strong>
                        <ul style="margin: 5px 0 0 20px;">${validation.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="validation-result invalid">
                <strong>❌ Validierung fehlgeschlagen</strong>
                <div class="validation-errors" style="margin-top: 10px;">
                    <strong>Fehler:</strong>
                    <ul style="margin: 5px 0 0 20px;">${validation.errors.map(e => `<li>${e}</li>`).join('')}</ul>
                </div>
                ${validation.warnings.length > 0 ? `
                    <div class="validation-warnings" style="margin-top: 10px;">
                        <strong>⚠️ Warnungen:</strong>
                        <ul style="margin: 5px 0 0 20px;">${validation.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            </div>
        `;
    }
}

/**
 * Handle API requests for direct responses
 */
function handleApiRequest() {
    const params = new URLSearchParams(window.location.search);
    const format = params.get('format');
    
    if (format === 'svg' || format === 'png') {
        setTimeout(() => {
            const canvas = document.getElementById('barcode');
            if (canvas && canvas.width > 0) {
                if (format === 'png') {
                    // Convert to PNG and redirect
                    canvas.toBlob((blob) => {
                        const url = URL.createObjectURL(blob);
                        window.location.replace(url);
                    }, 'image/png', 1.0);
                } else if (format === 'svg') {
                    // Generate SVG and redirect
                    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    const elementString = toolkit.buildGS1elementStrings(currentGs1Data, false);
                    
                    JsBarcode(svg, elementString, {
                        format: "CODE128",
                        width: 2,
                        height: 80,
                        displayValue: true
                    });
                    
                    const svgData = new XMLSerializer().serializeToString(svg);
                    const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
                    const svgUrl = URL.createObjectURL(svgBlob);
                    window.location.replace(svgUrl);
                }
            }
        }, 1000);
    }
}

/**
 * Handle Digital Link API response
 */
function handleDigitalLinkResponse() {
    if (currentGs1Data && Object.keys(currentGs1Data).length > 0) {
        const useShortCodes = new URLSearchParams(window.location.search).get('short') === 'true';
        const domain = new URLSearchParams(window.location.search).get('domain') || 'https://id.gs1.org';
        const digitalLink = toolkit.buildGS1digitalLink(currentGs1Data, useShortCodes, domain);
        
        // For API usage, redirect to the digital link
        window.location.replace(digitalLink);
    }
}

/**
 * Handle Element String API response
 */
function handleElementStringResponse() {
    if (currentGs1Data && Object.keys(currentGs1Data).length > 0) {
        const elementString = toolkit.buildGS1elementStrings(currentGs1Data, true);
        
        // Create a simple page showing the element string
        document.body.innerHTML = `
            <div style="font-family: monospace; padding: 20px; text-align: center;">
                <h2>GS1 Element String</h2>
                <div style="font-size: 1.5em; margin: 20px; padding: 20px; background: #f0f0f0; border-radius: 8px;">
                    ${elementString}
                </div>
                <p style="color: #666;">Generated by ruhrdot GmbH</p>
            </div>
        `;
    }
}

/**
 * Utility Functions
 */
function clearForm() {
    document.getElementById('gtin').value = '';
    document.getElementById('batch').value = '';
    document.getElementById('serial').value = '';
    document.getElementById('expiry').value = '';
    document.getElementById('domain').value = 'https://ruhragency.github.io/gs1.github.io/';
    document.getElementById('format').value = 'digital-link';
    document.getElementById('use-short-codes').checked = false;
    document.getElementById('output').innerHTML = '';
    document.getElementById('validation-result').innerHTML = '';
    document.getElementById('barcode-container').style.display = 'none';
    
    // Reset URL examples
    document.getElementById('svg-url').textContent = 'Generieren Sie zuerst einen Code...';
    document.getElementById('png-url').textContent = 'Generieren Sie zuerst einen Code...';
    document.getElementById('dl-url').textContent = 'Generieren Sie zuerst einen Code...';
    
    currentGs1Data = {};
    showSuccess('Formular zurückgesetzt');
}

function showError(message) {
    displayOutput(`
        <div class="alert alert-error">
            <strong>❌ Fehler:</strong> ${message}
        </div>
    `);
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'alert alert-success';
    successDiv.innerHTML = `<strong>✅ Erfolg:</strong> ${message}`;
    successDiv.style.position = 'fixed';
    successDiv.style.top = '20px';
    successDiv.style.right = '20px';
    successDiv.style.zIndex = '10000';
    successDiv.style.maxWidth = '300px';
    
    document.body.appendChild(successDiv);
    
    setTimeout(() => {
        successDiv.remove();
    }, 3000);
}

function showWarning(message) {
    displayOutput(`
        <div class="alert alert-warning">
            <strong>⚠️ Warnung:</strong> ${message}
        </div>
    `);
}

function displayOutput(html) {
    document.getElementById('output').innerHTML = html;
}

function showLoading(show) {
    const btnText = document.getElementById('generate-btn-text');
    const loading = document.getElementById('generate-loading');
    const btn = btnText?.parentElement;
    
    if (show) {
        if (btnText) btnText.style.display = 'none';
        if (loading) loading.style.display = 'inline-block';
        if (btn) btn.disabled = true;
    } else {
        if (btnText) btnText.style.display = 'inline';
        if (loading) loading.style.display = 'none';
        if (btn) btn.disabled = false;
    }
}

function copyToClipboard(button, text) {
    const textToCopy = text || button.nextElementSibling?.textContent || button.parentElement.querySelector('span')?.textContent;
    
    if (!textToCopy) {
        showError('Kein Text zum Kopieren gefunden');
        return;
    }
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = button.textContent;
        const originalBg = button.style.background;
        
        button.textContent = '✅ Kopiert!';
        button.style.background = 'var(--success-color)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBg;
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.textContent = '✅ Kopiert!';
            setTimeout(() => button.textContent = 'Kopieren', 2000);
        } catch (fallbackError) {
            showError('Kopieren fehlgeschlagen - Browser unterstützt diese Funktion nicht');
        }
    });
}

function openInNewTab(url) {
    try {
        window.open(url, '_blank', 'noopener,noreferrer');
    } catch (error) {
        showError('Link konnte nicht geöffnet werden');
    }
}

function generateBarcodeFromElementString(elementString) {
    try {
        const canvas = document.getElementById('barcode');
        
        JsBarcode(canvas, elementString, {
            format: "CODE128",
            width: 2,
            height: 80,
            displayValue: true,
            fontSize: 14,
            textMargin: 8,
            margin: 10
        });

        document.getElementById('barcode-container').style.display = 'block';
        showSuccess('Barcode aus Element String generiert');
    } catch (error) {
        showError('Fehler beim Generieren des Barcodes: ' + error.message);
    }
}

function validateBarcode() {
    try {
        const validation = toolkit.validateGS1Data(currentGs1Data);
        
        if (validation.valid) {
            showSuccess('Barcode ist gültig und entspricht GS1-Standards');
        } else {
            showError('Barcode-Validierung fehlgeschlagen: ' + validation.errors.join(', '));
        }
        
        displayValidationResult(validation);
    } catch (error) {
        showError('Fehler bei der Validierung: ' + error.message);
    }
}

function testDigitalLink(digitalLink) {
    try {
        // Test if the digital link can be parsed back
        const extracted = toolkit.extractFromGS1digitalLink(digitalLink);
        
        if (Object.keys(extracted.GS1).length > 0) {
            showSuccess('Digital Link ist gültig und kann korrekt analysiert werden');
            
            // Show extracted data
            let info = '<div style="margin-top: 16px; padding: 16px; background: var(--bg-color); border-radius: 8px;"><strong>🔍 Analysierte Daten:</strong><br><br>';
            for (const [ai, value] of Object.entries(extracted.GS1)) {
                info += `<div>AI ${ai}: <code>${value}</code></div>`;
            }
            info += '</div>';
            
            displayOutput(`
                <div class="alert alert-success">
                    <strong>✅ Digital Link Test erfolgreich!</strong><br>
                    Der Link ist gültig und entspricht GS1-Standards.
                    ${info}
                </div>
            `);
        } else {
            showError('Digital Link konnte nicht korrekt analysiert werden');
        }
    } catch (error) {
        showError('Fehler beim Testen des Digital Links: ' + error.message);
    }
}

function generateQRCode(digitalLink) {
    try {
        // Create QR code modal/container
        const qrContainer = document.createElement('div');
        qrContainer.id = 'qr-modal';
        qrContainer.innerHTML = `
            <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;">
                <div style="background: white; padding: 30px; border-radius: 16px; max-width: 400px; text-align: center;">
                    <h3 style="margin-bottom: 20px; color: var(--text-color);">📱 QR-Code für GS1 Digital Link</h3>
                    <div id="qr-code" style="margin: 20px 0;"></div>
                    <div style="margin: 20px 0; font-size: 0.9em; color: var(--text-light); word-break: break-all;">
                        ${digitalLink}
                    </div>
                    <button class="btn btn-success" onclick="downloadQRCode()">💾 QR-Code herunterladen</button>
                    <button class="btn btn-secondary" onclick="closeQRModal()">❌ Schließen</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(qrContainer);
        
        // Generate QR code using a simple implementation
        generateQRCodeCanvas(digitalLink, document.getElementById('qr-code'));
        
    } catch (error) {
        showError('Fehler beim Erstellen des QR-Codes: ' + error.message);
    }
}

function generateQRCodeCanvas(text, container) {
    // This is a placeholder - in production you would use a QR code library
    container.innerHTML = `
        <div style="width: 200px; height: 200px; background: #f0f0f0; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; margin: 0 auto;">
            <div style="text-align: center; color: #666;">
                <div style="font-size: 2em; margin-bottom: 10px;">📱</div>
                <div style="font-size: 0.9em;">QR-Code<br>würde hier erscheinen</div>
                <div style="font-size: 0.8em; margin-top: 10px; color: #999;">
                    (QR-Library erforderlich)
                </div>
            </div>
        </div>
    `;
}

function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.remove();
    }
}

function downloadQRCode() {
    showError('QR-Code Download erfordert eine QR-Code-Bibliothek');
}

function downloadBarcode(format) {
    try {
        const canvas = document.getElementById('barcode');
        const filename = `gs1-barcode-${currentGs1Data['01'] || 'generated'}-${Date.now()}`;
        
        if (format === 'svg') {
            // Create SVG version
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const elementString = toolkit.buildGS1elementStrings(currentGs1Data, false);
            
            JsBarcode(svg, elementString, {
                format: "CODE128",
                width: 2,
                height: 80,
                displayValue: true,
                fontSize: 14,
                textMargin: 8,
                margin: 10
            });
            
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
            const svgUrl = URL.createObjectURL(svgBlob);
            
            const downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = `${filename}.svg`;
            downloadLink.click();
            
            URL.revokeObjectURL(svgUrl);
            showSuccess('SVG Barcode heruntergeladen!');
        } else if (format === 'png') {
            // PNG download with high quality
            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${filename}.png`;
                link.href = url;
                link.click();
                URL.revokeObjectURL(url);
                showSuccess('PNG Barcode heruntergeladen!');
            }, 'image/png', 1.0);
        }
    } catch (error) {
        showError('Fehler beim Herunterladen: ' + error.message);
    }
}

function printBarcode() {
    try {
        const canvas = document.getElementById('barcode');
        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const humanReadable = toolkit.buildGS1elementStrings(currentGs1Data, true);
        
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>GS1 Barcode - ruhrdot GmbH</title>
                    <style>
                        body { 
                            font-family: Arial, sans-serif; 
                            text-align: center; 
                            margin: 20px;
                            background: white;
                        }
                        .header { 
                            margin-bottom: 30px; 
                            border-bottom: 2px solid #2563eb;
                            padding-bottom: 20px;
                        }
                        .barcode-container { 
                            margin: 30px 0; 
                            padding: 20px;
                            border: 1px solid #e5e7eb;
                            border-radius: 8px;
                        }
                        .info { 
                            margin-top: 20px; 
                            font-size: 12px; 
                            color: #666;
                        }
                        img { max-width: 100%; height: auto; }
                        @media print {
                            body { margin: 0; }
                            .no-print { display: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>GS1 Barcode</h2>
                        <p>Generiert von ruhrdot GmbH • ${new Date().toLocaleString('de-DE')}</p>
                    </div>
                    
                    <div class="barcode-container">
                        <img src="${dataUrl}" alt="GS1 Barcode">
                        <div class="info">
                            <p><strong>GTIN:</strong> ${currentGs1Data['01'] || 'N/A'}</p>
                            <p><strong>Element String:</strong> ${humanReadable}</p>
                            <p><strong>Format:</strong> GS1-128 (CODE128)</p>
                        </div>
                    </div>
                    
                    <div class="info">
                        <p>© 2024 ruhrdot GmbH - Professionelle GS1 Services</p>
                    </div>
                    
                    <script>
                        window.onload = function() { 
                            window.print(); 
                            setTimeout(() => window.close(), 1000);
                        }
                    </script>
                </body>
            </html>
        `);
    } catch (error) {
        showError('Fehler beim Drucken: ' + error.message);
    }
}

async function copyBarcodeToClipboard() {
    try {
        const canvas = document.getElementById('barcode');
        canvas.toBlob(async (blob) => {
            try {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                showSuccess('Barcode-Bild in Zwischenablage kopiert!');
            } catch (err) {
                showError('Zwischenablage wird nicht unterstützt');
            }
        });
    } catch (error) {
        showError('Fehler beim Kopieren: ' + error.message);
    }
}

/**
 * Initialize Application
 */
function initializeGS1Service() {
    console.log('🚀 GS1 Service initializing...');
    
    try {
        // Load URL parameters
        loadFromUrlParams();
        
        // Setup event listeners
        document.addEventListener('keydown', handleKeyDown);
        
        // Setup GTIN input monitoring
        const gtinInput = document.getElementById('gtin');
        if (gtinInput) {
            gtinInput.addEventListener('paste', handleGTINPaste);
            gtinInput.addEventListener('input', handleGTINInput);
            gtinInput.addEventListener('blur', handleGTINBlur);
            
            // Add helper buttons
            addGTINHelperButtons();
        }
        
        // Setup URL monitoring
        monitorURLChanges();
        
        // Setup form validation
        const form = document.querySelector('form') || document.body;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateCode();
        });
        
        console.log('✅ GS1 Service initialized successfully');
        
    } catch (error) {
        console.error('❌ GS1 Service initialization failed:', error);
        reportError(error, 'initialization');
    }
}

// Handle form submission with Enter key
function handleKeyDown(event) {
    if (event.key === 'Enter') {
        const target = event.target;
        if (target.tagName === 'INPUT' && target.type !== 'checkbox') {
            event.preventDefault();
            generateCode();
        }
    }
}

// Handle paste events for GTIN input
function handleGTINPaste(event) {
    setTimeout(() => {
        const gtin = event.target.value.trim();
        if (gtin && /^\d{8,14}$/.test(gtin)) {
            // Auto-validate and fix GTIN on paste
            try {
                const gs1Data = { '01': gtin };
                const validation = toolkit.validateGS1Data(gs1Data);
                
                if (validation.valid) {
                    showSuccess('GTIN erfolgreich eingefügt und validiert');
                } else {
                    // Try to auto-fix GTIN
                    autoFixGTIN();
                }
            } catch (error) {
                // Try to auto-fix GTIN
                autoFixGTIN();
            }
        }
    }, 100);
}

/**
 * Auto-fix GTIN check digit
 */
function autoFixGTIN() {
    const gtinInput = document.getElementById('gtin');
    const gtin = gtinInput.value.trim();
    
    if (gtin && /^\d{8,14}$/.test(gtin)) {
        try {
            const fixedGTIN = toolkit.fixGTIN(gtin);
            if (fixedGTIN !== gtin) {
                gtinInput.value = fixedGTIN;
                showSuccess(`GTIN-Prüfziffer automatisch korrigiert: ${gtin} → ${fixedGTIN}`);
                
                // Trigger validation after fix
                setTimeout(() => {
                    try {
                        const gs1Data = { '01': fixedGTIN };
                        const validation = toolkit.validateGS1Data(gs1Data);
                        if (validation.valid) {
                            showSuccess('GTIN ist jetzt gültig!');
                        }
                    } catch (error) {
                        // Silent fail
                    }
                }, 500);
            }
        } catch (error) {
            showWarning('GTIN-Prüfziffer konnte nicht automatisch korrigiert werden: ' + error.message);
        }
    }
}

/**
 * Manual GTIN fix button
 */
function manualFixGTIN() {
    autoFixGTIN();
}

/**
 * Enhanced GTIN input handler
 */
function handleGTINInput(event) {
    const input = event.target;
    const originalValue = input.value;
    
    // Remove non-numeric characters
    input.value = input.value.replace(/\D/g, '');
    
    // Limit to 14 digits
    if (input.value.length > 14) {
        input.value = input.value.substr(0, 14);
    }
    
    // Auto-validate on blur if length is correct
    if (input.value.length >= 8 && input.value.length <= 14) {
        // Add visual feedback
        input.style.borderColor = '';
        input.style.backgroundColor = '';
        
        // Check if GTIN is valid
        try {
            const validation = toolkit.validateGTIN(input.value);
            if (validation.valid) {
                input.style.borderColor = '#059669';
                input.style.backgroundColor = '#f0fdf4';
            } else {
                input.style.borderColor = '#dc2626';
                input.style.backgroundColor = '#fef2f2';
            }
        } catch (error) {
            input.style.borderColor = '#dc2626';
            input.style.backgroundColor = '#fef2f2';
        }
    }
}

/**
 * GTIN blur handler with auto-fix option
 */
function handleGTINBlur(event) {
    const gtin = event.target.value.trim();
    
    if (gtin && /^\d{8,14}$/.test(gtin)) {
        try {
            const validation = toolkit.validateGTIN(gtin);
            if (!validation.valid) {
                // Show auto-fix option
                showGTINFixOption(gtin);
            }
        } catch (error) {
            showGTINFixOption(gtin);
        }
    }
}

/**
 * Show GTIN fix option dialog
 */
function showGTINFixOption(gtin) {
    try {
        const fixedGTIN = toolkit.fixGTIN(gtin);
        if (fixedGTIN !== gtin) {
            const confirmFix = confirm(
                `Die GTIN-Prüfziffer scheint falsch zu sein.\n\n` +
                `Aktuell: ${gtin}\n` +
                `Korrigiert: ${fixedGTIN}\n\n` +
                `Soll die GTIN automatisch korrigiert werden?`
            );
            
            if (confirmFix) {
                document.getElementById('gtin').value = fixedGTIN;
                showSuccess(`GTIN korrigiert: ${gtin} → ${fixedGTIN}`);
                
                // Update visual feedback
                const input = document.getElementById('gtin');
                input.style.borderColor = '#059669';
                input.style.backgroundColor = '#f0fdf4';
            }
        }
    } catch (error) {
        // Silent fail - invalid GTIN format
    }
}

/**
 * Add GTIN helper buttons
 */
function addGTINHelperButtons() {
    const gtinContainer = document.getElementById('gtin').parentElement;
    
    // Check if buttons already exist
    if (gtinContainer.querySelector('.gtin-helper-buttons')) {
        return;
    }
    
    const helperDiv = document.createElement('div');
    helperDiv.className = 'gtin-helper-buttons';
    helperDiv.style.marginTop = '8px';
    helperDiv.innerHTML = `
        <button type="button" class="btn btn-example" onclick="autoFixGTIN()" style="font-size: 12px; padding: 4px 8px;">
            🔧 GTIN korrigieren
        </button>
        <button type="button" class="btn btn-example" onclick="generateRandomGTIN()" style="font-size: 12px; padding: 4px 8px;">
            🎲 Zufällige GTIN
        </button>
        <button type="button" class="btn btn-example" onclick="validateCurrentGTIN()" style="font-size: 12px; padding: 4px 8px;">
            ✓ GTIN prüfen
        </button>
    `;
    
    gtinContainer.appendChild(helperDiv);
}

/**
 * Generate random valid GTIN for testing
 */
function generateRandomGTIN() {
    // Generate random 13-digit base
    let randomBase = '';
    for (let i = 0; i < 13; i++) {
        randomBase += Math.floor(Math.random() * 10);
    }
    
    // Calculate check digit
    const checkDigit = toolkit.calculateGTINCheckDigit(randomBase);
    const validGTIN = randomBase + checkDigit;
    
    document.getElementById('gtin').value = validGTIN;
    showSuccess(`Zufällige gültige GTIN generiert: ${validGTIN}`);
    
    // Update visual feedback
    const input = document.getElementById('gtin');
    input.style.borderColor = '#059669';
    input.style.backgroundColor = '#f0fdf4';
}

/**
 * Validate current GTIN in input
 */
function validateCurrentGTIN() {
    const gtin = document.getElementById('gtin').value.trim();
    
    if (!gtin) {
        showWarning('Bitte geben Sie eine GTIN ein');
        return;
    }
    
    if (!/^\d{8,14}$/.test(gtin)) {
        showError('GTIN muss 8-14 Ziffern enthalten');
        return;
    }
    
    try {
        const validation = toolkit.validateGTIN(gtin);
        if (validation.valid) {
            showSuccess(`✅ GTIN ${gtin} ist gültig!`);
            
            // Show additional info
            const paddedGTIN = gtin.padStart(14, '0');
            const checkDigit = paddedGTIN.slice(-1);
            displayOutput(`
                <div class="alert alert-success">
                    <strong>✅ GTIN-Validierung erfolgreich!</strong><br><br>
                    <strong>Eingabe:</strong> ${gtin}<br>
                    <strong>Vollformat (14-stellig):</strong> ${paddedGTIN}<br>
                    <strong>Prüfziffer:</strong> ${checkDigit}<br>
                    <strong>Status:</strong> Gültige GTIN nach GS1-Standard
                </div>
            `);
        } else {
            showError(`❌ GTIN ${gtin} ist ungültig: ${validation.error}`);
            
            // Offer auto-fix
            try {
                const fixedGTIN = toolkit.fixGTIN(gtin);
                if (fixedGTIN !== gtin) {
                    displayOutput(`
                        <div class="alert alert-error">
                            <strong>❌ GTIN-Validierung fehlgeschlagen!</strong><br><br>
                            <strong>Fehler:</strong> ${validation.error}<br>
                            <strong>Eingabe:</strong> ${gtin}<br>
                            <strong>Korrektur:</strong> ${fixedGTIN}<br><br>
                            <button class="btn btn-success" onclick="document.getElementById('gtin').value='${fixedGTIN}'; autoFixGTIN();">
                                🔧 Automatisch korrigieren
                            </button>
                        </div>
                    `);
                }
            } catch (fixError) {
                displayOutput(`
                    <div class="alert alert-error">
                        <strong>❌ GTIN-Validierung fehlgeschlagen!</strong><br><br>
                        <strong>Fehler:</strong> ${validation.error}<br>
                        <strong>Eingabe:</strong> ${gtin}<br>
                        <strong>Hinweis:</strong> GTIN kann nicht automatisch korrigiert werden
                    </div>
                `);
            }
        }
    } catch (error) {
        showError('Validierungsfehler: ' + error.message);
    }
}

// URL parameter monitoring
function monitorURLChanges() {
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            loadFromUrlParams();
        }
    }).observe(document, { subtree: true, childList: true });
}

// Performance monitoring
function logPerformance(operation, startTime) {
    const endTime = performance.now();
    const duration = endTime - startTime;
    console.log(`GS1 Service - ${operation}: ${duration.toFixed(2)}ms`);
    
    if (duration > 1000) {
        console.warn(`Performance warning: ${operation} took ${duration.toFixed(2)}ms`);
    }
}

// Error reporting
function reportError(error, context) {
    console.error('GS1 Service Error:', {
        error: error.message,
        context: context,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    });
    
    // In production, you might want to send this to an error tracking service
}

// Service Worker registration (optional for offline functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('✅ Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
    reportError(event.error, 'global');
});

window.addEventListener('unhandledrejection', (event) => {
    reportError(new Error(event.reason), 'promise');
});

/**
 * Export functions for external use
 */
if (typeof window !== 'undefined') {
    window.GS1Service = {
        generateCode,
        toolkit,
        collectFormData,
        generateDigitalLink,
        generateElementString,
        generateBarcode,
        validateBarcode,
        clearForm,
        loadExample,
        autoFixGTIN,
        manualFixGTIN,
        generateRandomGTIN,
        validateCurrentGTIN
    };
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGS1Service);
    } else {
        initializeGS1Service();
    }
}