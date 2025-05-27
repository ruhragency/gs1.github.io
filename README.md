# 🏷️ GS1 Code Generator Service

Ein vollständiger Service zum Generieren von GS1 Digital Links und Barcodes mit URL-API-Unterstützung.

## ✨ Features

- **🎯 GS1 Digital Link Generierung** - Erstelle standardkonforme GS1 Digital Links
- **📊 Barcode-Generierung** - SVG und PNG Barcodes im GS1-128 Format
- **🔗 URL-API** - Generiere Codes direkt über URL-Parameter
- **✅ Validierung** - Automatische GS1-Datenvalidierung und Check-Digit-Prüfung
- **📱 Responsive Design** - Funktioniert auf Desktop und Mobile
- **🚀 Einfache Integration** - Kann als API-Service oder Standalone-Tool verwendet werden

## 🚀 Schnellstart

### Lokal ausführen

1. Repository klonen:
```bash
git clone https://github.com/yourusername/gs1-code-generator.git
cd gs1-code-generator
```

2. `index.html` in einem Browser öffnen oder über einen Webserver bereitstellen:
```bash
# Mit Python
python -m http.server 8000

# Mit Node.js (http-server)
npx http-server

# Mit PHP
php -S localhost:8000
```

3. Im Browser öffnen: `http://localhost:8000`

### Als Service verwenden

Die Anwendung kann direkt über URL-Parameter verwendet werden:

```
https://your-domain.com/?gtin=04012345123456&format=svg
```

## 📖 API Dokumentation

### URL-Parameter

| Parameter | Beschreibung | Beispiel | Erforderlich |
|-----------|--------------|----------|--------------|
| `gtin` | GTIN (8, 12, 13 oder 14 Ziffern) | `04012345123456` | ✅ |
| `batch` | Batch/Lot Nummer (AI 10) | `ABC123` | ❌ |
| `serial` | Seriennummer (AI 21) | `12345` | ❌ |
| `expiry` | Ablaufdatum (YYMMDD oder YYYY-MM-DD) | `251231` | ❌ |
| `format` | Ausgabeformat | `svg`, `png`, `digital-link`, `element-string` | ❌ |
| `domain` | Domain für Digital Link | `https://example.com` | ❌ |
| `width` | Barcode-Breite | `2` | ❌ |
| `height` | Barcode-Höhe | `80` | ❌ |
| `short` | Kurze Codes verwenden | `true`, `1` | ❌ |

### Ausgabeformate

#### SVG Barcode
```
?gtin=04012345123456&format=svg
```
Gibt einen GS1-128 Barcode als SVG zurück.

#### PNG Barcode  
```
?gtin=04012345123456&format=png
```
Gibt einen GS1-128 Barcode als PNG zurück.

#### GS1 Digital Link
```
?gtin=04012345123456&batch=ABC123&format=digital-link
```
Gibt einen GS1 Digital Link zurück:
```
https://id.gs1.org/01/04012345123456?10=ABC123
```

#### Element String
```
?gtin=04012345123456&batch=ABC123&format=element-string
```
Gibt einen GS1 Element String zurück:
```
(01)04012345123456(10)ABC123
```

## 🔧 Integration Beispiele

### HTML Image Tag
```html
<img src="https://your-domain.com/?gtin=04012345123456&format=svg" alt="GS1 Barcode">
```

### JavaScript/AJAX
```javascript
fetch('https://your-domain.com/?gtin=04012345123456&format=digital-link')
  .then(response => response.text())
  .then(digitalLink => console.log(digitalLink));
```

### QR-Code Generator
```javascript
// Generiere GS1 Digital Link für QR-Code
const digitalLink = `https://your-domain.com/?gtin=${product.gtin}&format=digital-link`;
// Verwende digitalLink mit einem QR-Code Generator
```

### E-Commerce Integration
```php
<?php
$gtin = $product['gtin'];
$batch = $product['batch'];
$barcodeUrl = "https://your-domain.com/?gtin={$gtin}&batch={$batch}&format=svg";
echo "<img src='{$barcodeUrl}' alt='Product Barcode'>";
?>
```

## 🏗️ Architektur

### Dateien

- **`gs1.js`** - GS1 Digital Link Toolkit (Kern-Bibliothek)
- **`index.html`** - Web-Interface und API-Handler

### GS1 Digital Link Toolkit

Die `GS1DigitalLinkToolkit` Klasse bietet folgende Hauptfunktionen:

```javascript
const toolkit = new GS1DigitalLinkToolkit();

// GS1 Digital Link erstellen
const digitalLink = toolkit.buildGS1digitalLink(gs1Data, useShortText, domain);

// Element String erstellen
const elementString = toolkit.buildGS1elementStrings(gs1Data, brackets);

// Daten aus Digital Link extrahieren
const extracted = toolkit.extractFromGS1digitalLink(digitalLink);

// Validierung
const validation = toolkit.validateGS1Data(gs1Data);
```

### Unterstützte GS1 Application Identifiers

| AI | Bezeichnung | Format | Typ |
|----|-------------|--------|-----|
| 00 | SSCC | N18 | Identifier |
| 01 | GTIN | N14 | Identifier |
| 10 | Batch/Lot | X..20 | Qualifier |
| 11 | Production Date | N6 | Data |
| 12 | Due Date | N6 | Data |
| 13 | Packaging Date | N6 | Data |
| 15 | Best Before Date | N6 | Data |
| 17 | Expiration Date | N6 | Data |
| 21 | Serial Number | X..20 | Qualifier |
| 22 | CPV | X..20 | Qualifier |
| 30 | Variable Count | N..8 | Data |
| 37 | Count of Items | N..8 | Data |

## 🔧 Konfiguration

### Anpassung der Domain
```javascript
// Standard-Domain ändern
const toolkit = new GS1DigitalLinkToolkit();
const digitalLink = toolkit.buildGS1digitalLink(gs1Data, false, 'https://your-domain.com');
```

### Barcode-Styling
```javascript
// Barcode-Optionen anpassen
JsBarcode(canvas, elementString, {
    format: "CODE128",
    width: 3,           // Strichbreite
    height: 100,        // Höhe
    displayValue: true, // Text anzeigen
    fontSize: 14,       // Schriftgröße
    margin: 10         // Rand
});
```

## 🧪 Testing

### Manuelle Tests
1. Öffne `index.html` im Browser
2. Teste verschiedene GTIN-Formate (8, 12, 13, 14 Ziffern)
3. Teste URL-Parameter-API
4. Validiere Barcode-Output

### Beispiel-GTINs für Tests
```
04012345123456  # 14-stellig
401234512345    # 12-stellig
1234567890128   # 13-stellig (EAN-13)
12345678        # 8-stellig (EAN-8)
```

## 🚀 Deployment

### GitHub Pages
1. Repository auf GitHub erstellen
2. In Repository-Settings "Pages" aktivieren
3. Source auf "Deploy from a branch" setzen
4. Branch "main" und Folder "/