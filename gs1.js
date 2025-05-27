        // GS1DigitalLinkToolkit aus dem Dokument einbinden
        class GS1DigitalLinkToolkit {
            constructor() {
                // Vereinfachte Version für Demo-Zwecke
                this.groupSeparator = String.fromCharCode(29);
            }

            // Vereinfachte Implementierung für Demo
            buildGS1digitalLink(gs1AIarray, useShortText, uriStem, nonGS1keyvaluePairs) {
                let path = "";
                let queryString = "";
                let queryParams = [];

                // Hauptidentifikator (GTIN)
                if (gs1AIarray['01']) {
                    path = `/01/${gs1AIarray['01']}`;
                }

                // Qualifiers hinzufügen
                if (gs1AIarray['21']) {
                    path += `/21/${gs1AIarray['21']}`;
                }

                // Data Attributes als Query Parameter
                if (gs1AIarray['10']) {
                    queryParams.push(`10=${encodeURIComponent(gs1AIarray['10'])}`);
                }
                if (gs1AIarray['17']) {
                    queryParams.push(`17=${gs1AIarray['17']}`);
                }

                if (queryParams.length > 0) {
                    queryString = "?" + queryParams.join("&");
                }

                const stem = uriStem || 'https://id.gs1.org';
                return stem + path + queryString;
            }

            buildGS1elementStrings(gs1AIarray, brackets) {
                let result = "";
                
                if (brackets) {
                    // Mit Klammern
                    if (gs1AIarray['01']) result += `(01)${this.padGTIN(gs1AIarray['01'])}`;
                    if (gs1AIarray['10']) result += `(10)${gs1AIarray['10']}`;
                    if (gs1AIarray['17']) result += `(17)${gs1AIarray['17']}`;
                    if (gs1AIarray['21']) result += `(21)${gs1AIarray['21']}`;
                } else {
                    // Ohne Klammern, mit Group Separator
                    if (gs1AIarray['01']) result += `01${this.padGTIN(gs1AIarray['01'])}`;
                    if (gs1AIarray['10']) result += `10${gs1AIarray['10']}${this.groupSeparator}`;
                    if (gs1AIarray['17']) result += `17${gs1AIarray['17']}`;
                    if (gs1AIarray['21']) result += `21${gs1AIarray['21']}`;
                }
                
                return result;
            }

            padGTIN(gtin) {
                if (gtin.length === 8) return '000000' + gtin;
                if (gtin.length === 12) return '00' + gtin;
                if (gtin.length === 13) return '0' + gtin;
                return gtin;
            }

            calculateCheckDigit(ai, value) {
                if (ai !== '01') return 0;
                
                let sum = 0;
                let multiplier = 3;
                
                for (let i = value.length - 2; i >= 0; i--) {
                    sum += parseInt(value[i]) * multiplier;
                    multiplier = multiplier === 3 ? 1 : 3;
                }
                
                return (10 - (sum % 10)) % 10;
            }

            verifyCheckDigit(ai, value) {
                if (ai !== '01' || value.length < 8) return true;
                
                const checkDigit = parseInt(value[value.length - 1]);
                const calculatedCheckDigit = this.calculateCheckDigit(ai, value);
                
                return checkDigit === calculatedCheckDigit;
            }
        }

        const toolkit = new GS1DigitalLinkToolkit();

        function loadFromUrlParams() {
            const params = new URLSearchParams(window.location.search);
            
            if (params.get('gtin')) document.getElementById('gtin').value = params.get('gtin');
            if (params.get('batch')) document.getElementById('batch').value = params.get('batch');
            if (params.get('serial')) document.getElementById('serial').value = params.get('serial');
            if (params.get('expiry')) {
                const expiry = params.get('expiry');
                if (expiry.length === 6) {
                    // Convert YYMMDD to YYYY-MM-DD
                    const year = 2000 + parseInt(expiry.substr(0, 2));
                    const month = expiry.substr(2, 2);
                    const day = expiry.substr(4, 2);
                    document.getElementById('expiry').value = `${year}-${month}-${day}`;
                }
            }
            if (params.get('domain')) document.getElementById('domain').value = params.get('domain');
            if (params.get('format')) document.getElementById('format').value = params.get('format');

            // Auto-generate if parameters are present
            if (params.get('gtin')) {
                setTimeout(() => {
                    generateCode();
                    if (params.get('format') === 'svg' || params.get('format') === 'png') {
                        handleApiRequest();
                    }
                }, 100);
            }
        }

        function generateCode() {
            const gtin = document.getElementById('gtin').value.trim();
            const batch = document.getElementById('batch').value.trim();
            const serial = document.getElementById('serial').value.trim();
            const expiry = document.getElementById('expiry').value;
            const domain = document.getElementById('domain').value.trim() || 'https://id.gs1.org';
            const format = document.getElementById('format').value;

            if (!gtin) {
                showError('GTIN ist erforderlich');
                return;
            }

            if (!/^\d{8}$|^\d{12}$|^\d{13}$|^\d{14}$/.test(gtin)) {
                showError('GTIN muss 8, 12, 13 oder 14 Ziffern haben');
                return;
            }

            // Build GS1 AI array
            const gs1AIarray = {};
            gs1AIarray['01'] = gtin;
            
            if (batch) gs1AIarray['10'] = batch;
            if (serial) gs1AIarray['21'] = serial;
            if (expiry) {
                const date = new Date(expiry);
                const year = date.getFullYear().toString().substr(2);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                gs1AIarray['17'] = year + month + day;
            }

            try {
                let output = '';
                
                switch (format) {
                    case 'digital-link':
                        output = toolkit.buildGS1digitalLink(gs1AIarray, false, domain, {});
                        break;
                    case 'element-string':
                        output = toolkit.buildGS1elementStrings(gs1AIarray, true);
                        break;
                    case 'svg':
                    case 'png':
                        generateBarcode(gs1AIarray, format);
                        return;
                }

                document.getElementById('output').innerHTML = `
                    <div class="alert alert-success">
                        <strong>Erfolgreich generiert:</strong><br>
                        <code>${output}</code>
                        <br><br>
                        <button class="btn btn-success" onclick="copyToClipboard(this, '${output}')">Kopieren</button>
                    </div>
                `;

                updateUrlExamples(gs1AIarray, domain);
                
            } catch (error) {
                showError('Fehler beim Generieren: ' + error.message);
            }
        }

        function generateBarcode(gs1AIarray, format) {
            const elementString = toolkit.buildGS1elementStrings(gs1AIarray, false);
            const canvas = document.getElementById('barcode');
            
            try {
                JsBarcode(canvas, elementString, {
                    format: "CODE128",
                    width: 3,
                    height: 100,
                    displayValue: true,
                    fontSize: 14,
                    textMargin: 5
                });

                document.getElementById('barcode-container').style.display = 'block';
                document.getElementById('barcode-text').innerHTML = `
                    <p><strong>Element String:</strong> ${toolkit.buildGS1elementStrings(gs1AIarray, true)}</p>
                    <button class="btn btn-success" onclick="downloadBarcode('${format}')">Als ${format.toUpperCase()} herunterladen</button>
                `;

                document.getElementById('output').innerHTML = `
                    <div class="alert alert-success">
                        <strong>Barcode erfolgreich generiert!</strong>
                    </div>
                `;

            } catch (error) {
                showError('Fehler beim Generieren des Barcodes: ' + error.message);
            }
        }

        function downloadBarcode(format) {
            const canvas = document.getElementById('barcode');
            
            if (format === 'svg') {
                // For SVG, we need to recreate with SVG format
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                JsBarcode(svg, canvas.getAttribute('data-value') || "123456789", {
                    format: "CODE128",
                    width: 3,
                    height: 100,
                    displayValue: true
                });
                
                const svgData = new XMLSerializer().serializeToString(svg);
                const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
                const svgUrl = URL.createObjectURL(svgBlob);
                
                const downloadLink = document.createElement("a");
                downloadLink.href = svgUrl;
                downloadLink.download = "barcode.svg";
                downloadLink.click();
            } else {
                // PNG download
                const link = document.createElement('a');
                link.download = 'barcode.png';
                link.href = canvas.toDataURL();
                link.click();
            }
        }

        function updateUrlExamples(gs1AIarray, domain) {
            const baseUrl = window.location.origin + window.location.pathname;
            const params = new URLSearchParams();
            
            if (gs1AIarray['01']) params.set('gtin', gs1AIarray['01']);
            if (gs1AIarray['10']) params.set('batch', gs1AIarray['10']);
            if (gs1AIarray['21']) params.set('serial', gs1AIarray['21']);
            if (gs1AIarray['17']) params.set('expiry', gs1AIarray['17']);
            if (domain !== 'https://id.gs1.org') params.set('domain', domain);

            const baseParams = params.toString();
            
            document.getElementById('svg-url').textContent = `${baseUrl}?${baseParams}&format=svg`;
            document.getElementById('png-url').textContent = `${baseUrl}?${baseParams}&format=png`;
            
            const digitalLink = toolkit.buildGS1digitalLink(gs1AIarray, false, domain, {});
            document.getElementById('dl-url').textContent = digitalLink;
        }

        function clearForm() {
            document.getElementById('gtin').value = '';
            document.getElementById('batch').value = '';
            document.getElementById('serial').value = '';
            document.getElementById('expiry').value = '';
            document.getElementById('domain').value = 'https://id.gs1.org';
            document.getElementById('format').value = 'svg';
            document.getElementById('output').innerHTML = '';
            document.getElementById('barcode-container').style.display = 'none';
        }

        function showError(message) {
            document.getElementById('output').innerHTML = `
                <div class="alert alert-error">
                    <strong>Fehler:</strong> ${message}
                </div>
            `;
        }

        function copyToClipboard(button, text) {
            const textToCopy = text || button.nextElementSibling.textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Kopiert!';
                button.style.background = '#27ae60';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '#667eea';
                }, 2000);
            });
        }

        function handleApiRequest() {
            const params = new URLSearchParams(window.location.search);
            const format = params.get('format');
            
            if (format === 'svg' || format === 'png') {
                // Generate and return barcode directly
                setTimeout(() => {
                    const canvas = document.getElementById('barcode');
                    if (canvas && canvas.width > 0) {
                        if (format === 'png') {
                            // Convert canvas to PNG and trigger download
                            canvas.toBlob((blob) => {
                                const url = URL.createObjectURL(blob);
                                window.location.href = url;
                            });
                        }
                    }
                }, 500);
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', loadFromUrlParams);