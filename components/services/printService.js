angular.module('prescritor').service('printService', function ($rootScope, $location, toast) {
    var doc = new jsPDF("p", "mm", "a4");
    var lMargin = 95; //left margin in mm
    var lMarginImage = 15; //left margin in mm
    var rMargin = 15; //right margin in mm
    var pdfInMM = 210; // width of A4 in mm

    this.onePage = (prescription) => {
        doc = new jsPDF("p", "mm", "a4");
        /* var paragraph = "Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design.";

        var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin)); */

        addHeaderPage(prescription)
        doc.text(lMargin, 60, "Paciente: " + prescription.pacient.name)
        doc.text(lMargin, 65, "Endereço: " + prescription.pacient.address.street || 'Não informado')

        doc.setFontSize(12);
        doc.text(lMargin, 75, "Prescrição")
        let top = 85
        doc.setFontType("normal");
        let i = 0
        prescription.prescriptions.forEach(function (element) {
            doc.setFontType("bold");
            doc.text(lMargin, top, "Medicamento " + ++i + " de " + prescription.prescriptions.length)
            doc.setFontType("normal");
            if (top > 210) {
                doc.addPage();
                top = 20
                addHeaderPage(prescription)
            }
            doc.text(lMargin, top += 10, "Nome: " + element.medicament.name)
            doc.text(lMargin, top += 10, "Apresentação: " + element.apresentation)
            doc.text(lMargin, top += 10, "Nome(s) comercial(is):")
            element.comercialName.forEach(function (name) {
                doc.text(lMargin, top += 10, " - " + name)
            })
            doc.text(lMargin, top += 10, "Quantidade: " + element.quantity + " " + element.unity.name)
            doc.text(lMargin, top += 10, "Forma de uso: " + element.useType.name)
            doc.text(lMargin, top += 10, "Descrição: " + element.description)
            top += 20
        })

        doc.save('Generated.pdf');
    }

    this.onePerPage = (prescription) => {
        doc = new jsPDF("p", "mm", "a4");
        var top = 85
        let i = 0
        prescription.prescriptions.forEach(function (element) {
            addHeaderPage(prescription)

            doc.text(lMargin, top, "Prescrição")
            doc.text(lMargin, top += 10, "Medicamento " + ++i + " de " + prescription.prescriptions.length)
            doc.setFontType("normal");
            doc.text(lMargin, top += 10, "Nome: " + element.medicament.name)
            doc.text(lMargin, top += 10, "Apresentação: " + element.apresentation)
            doc.text(lMargin, top += 10, "Nome(s) comercial(is):")
            element.comercialName.forEach(function (name) {
                doc.text(lMargin, top += 10, " - " + name)
            })
            doc.text(lMargin, top += 10, "Quantidade: " + element.quantity + " " + element.unity.name)
            doc.text(lMargin, top += 10, "Forma de uso: " + element.useType.name)
            doc.text(lMargin, top += 10, "Descrição: " + element.description)

            addHeaderPage(prescription)
            doc.text(lMargin, 60, "Paciente: " + prescription.pacient.name)
            doc.text(lMargin, 65, "Endereço: " + prescription.pacient.address.street || 'Não informado')
            top = 85
            if (i < prescription.prescriptions.length)
                doc.addPage();
        })

        doc.save('Generated.pdf');

    }

    function addHeaderPage(prescription) {
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text("RECEITUÁRIO DE CONTROLE ESPECIAL", pdfInMM / 2, 20, 'center')
        const qr = new QRious({ value: 'http://prescritor-qrCode.com/prescricao/' + prescription.id });
        doc.addImage(qr.toDataURL('image/png'), 'PNG', 170, 10, 30, 30);

        var img = $("#imageReceita")[0];
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");

        doc.addImage(canvas.toDataURL("image/png"), 'PNG', lMarginImage, 55, 70, 150);

        doc.text(prescription.pacient.doctor.name.toUpperCase(), pdfInMM / 2, 30, 'center')
        doc.text(prescription.pacient.doctor.profession + " | " + prescription.pacient.doctor.phone, pdfInMM / 2, 40, 'center')
        doc.text("CRM" + " " + prescription.pacient.doctor.crm, pdfInMM / 2, 50, 'center')
    }
})