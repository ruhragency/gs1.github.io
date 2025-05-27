/**
 * Complete JavaScript for GS1 Code Generator Service
 * ruhrdot GmbH - Professional GS1 Digital Link and Barcode Generation
 * 
 * @version 2.0.0
 * @author ruhrdot GmbH
 * @license MIT
 */

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
 * Download barcode in specified format
 */
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

/**
 * Print barcode with professional layout
 */
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

/**
 * Copy barcode image to clipboard
 */
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
 * Generate QR code for Digital Link
 */
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

/**
 * Simple QR code generation (placeholder - would need QR library)
 */
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

/**
 * Close QR code modal
 */
function closeQRModal() {
    const modal = document.getElementById('qr-modal');
    if (modal) {
        modal.remove();
    }
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
    document.getElementById('domain').value = 'https://id.gs1.org';
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

/**
 * Advanced Functions
 */

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

function downloadQRCode() {
    // Placeholder - would need actual QR code implementation
    showError('QR-Code Download erfordert eine QR-Code-Bibliothek');
}

/**
 * Batch Processing Functions
 */

function processBatch(gtinList) {
    const results = [];
    
    gtinList.forEach((gtin, index) => {
        try {
            const gs1Data = { '01': gtin.trim() };
            const validation = toolkit.validateGS1Data(gs1Data);
            
            if (validation.valid) {
                const digitalLink = toolkit.buildGS1digitalLink(gs1Data, false, 'https://id.gs1.org');
                results.push({
                    index: index + 1,
                    gtin: gtin,
                    status: 'success',
                    digitalLink: digitalLink
                });
            } else {
                results.push({
                    index: index + 1,
                    gtin: gtin,
                    status: 'error',
                    errors: validation.errors
                });
            }
        } catch (error) {
            results.push({
                index: index + 1,
                gtin: gtin,
                status: 'error',
                errors: [error.message]
            });
        }
    });
    
    return results;
}

/**
 * Export Functions
 */

function exportToCSV(data) {
    const headers = ['Index', 'GTIN', 'Status', 'Digital Link', 'Errors'];
    const csvContent = [
        headers.join(','),
        ...data.map(row => [
            row.index,
            row.gtin,
            row.status,
            row.digitalLink || '',
            (row.errors || []).join('; ')
        ].map(field => `"${field}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `gs1-export-${Date.now()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccess('CSV-Export erfolgreich heruntergeladen');
}

function exportToJSON(data) {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `gs1-export-${Date.now()}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showSuccess('JSON-Export erfolgreich heruntergeladen');
}

/**
 * Event Handlers and Initialization
 */

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
            // Auto-validate GTIN on paste
            try {
                const gs1Data = { '01': gtin };
                const validation = toolkit.validateGS1Data(gs1Data);
                
                if (validation.valid) {
                    showSuccess('GTIN erfolgreich eingefügt und validiert');
                } else {
                    showWarning('GTIN eingefügt, aber mit Validierungsfehlern');
                }
            } catch (error) {
                showWarning('GTIN eingefügt, aber Validierung fehlgeschlagen');
            }
        }
    }, 100);
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
            gtinInput.addEventListener('input', (e) => {
                // Remove non-numeric characters
                e.target.value = e.target.value.replace(/\D/g, '');
            });
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

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGS1Service);
} else {
    initializeGS1Service();
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
        exportToCSV,
        exportToJSON,
        processBatch
    };
}