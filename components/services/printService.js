angular.module('prescritor').service('printService', function ($rootScope, $location, toast) {
    var doc = new jsPDF("p", "mm", "a4");
    var lMargin = 65; //left margin in mm
    var lMarginImage = 15; //left margin in mm
    var rMargin = 15; //right margin in mm
    var pdfInMM = 210; // width of A4 in mm

    this.onePage = (prescription) => {
        doc = new jsPDF("p", "mm", "a4");
        /* var paragraph = "Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design.";

        var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin)); */

        addHeaderPage(prescription)

        /* doc.text(lMargin, 60, "Paciente: " + prescription.pacient.name)
        if (prescription.pacient.address && prescription.pacient.address.city) {
            doc.text(lMargin, 65, "Endereço: " + prescription.pacient.address.street + " - " + prescription.pacient.address.city.name + " - " + prescription.pacient.address.city.state.uf)
        } else {
            doc.text(lMargin, 65, "Endereço: Não informado")
        } */

        doc.setFontSize(12);
        //doc.text(lMargin, 75, "Prescrição")
        let top = 85
        doc.setFontType("normal");
        let i = 0
        prescription.prescriptions.forEach(function (element) {
            doc.setFontType("bold");
            doc.text(lMargin, top, "Uso " + element.useType.name)
            doc.setFontType("normal");
            if (top > 210) {
                doc.addPage();
                top = 20
                addHeaderPage(prescription)
            }

            var comercialNames = ""
            element.comercialName.forEach(function (name) {
                comercialNames = name + ", "
            })
            comercialNames = comercialNames.substring(0, comercialNames.length - 2)
            var lines = doc.splitTextToSize(element.description, (pdfInMM - (lMargin + 10) - rMargin));
            var medicamentLine = ++i + ") " +
                element.medicament.name +
                " " + element.apresentation +
                " (" + comercialNames + ")" +
                " - " + element.quantity +
                " " + element.unity.name;
            doc.text(lMargin, top += 10, medicamentLine)
            doc.text(lMargin + 5, top += 5, lines)
            top += 20
        })

        doc.save('Receita.pdf');
    }

    this.onePerPage = (prescription) => {
        doc = new jsPDF("p", "mm", "a4");
        var top = 85
        let i = 0
        prescription.prescriptions.forEach(function (element) {
            doc.setFontSize(12);
            doc.setFontType("bold");
            doc.text("Via Consultório", lMarginImage, 7)
            addHeaderPage(prescription)
            ++i;
            addBody(element, i, top)

            addSecondHeader(prescription)
            top = 235
            addBody(element, i, top)

            top = 85
            if (i < prescription.prescriptions.length)
                doc.addPage();
        })

        doc.save('Receita.pdf');

    }

    function addBody(element, i, top) {
        doc.setFontType("bold");
        doc.text(lMargin, top, "Uso " + element.useType.name)
        doc.setFontType("normal");

        var comercialNames = ""
        element.comercialName.forEach(function (name) {
            comercialNames = name + ", "
        })
        comercialNames = comercialNames.substring(0, comercialNames.length - 2)
        var lines = doc.splitTextToSize(element.description, (pdfInMM - (lMargin + 10) - rMargin));
        var medicamentLine = i + ") " +
            element.medicament.name +
            " " + element.apresentation +
            " (" + comercialNames + ")" +
            " - " + element.quantity +
            " " + element.unity.name;

        doc.text(lMargin, top += 10, medicamentLine)
        doc.text(lMargin + 5, top += 5, lines)
    }

    function addHeaderPage(prescription) {
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text("RECEITUÁRIO", pdfInMM / 2, 20, 'center')
        const qr = new QRious({ value: 'https://qr-code-app.herokuapp.com/#/paciente/prescricao/' + prescription.id });
        doc.addImage(qr.toDataURL('image/png'), 'PNG', 170, 10, 30, 30);

        var img = $("#imageReceita")[0];
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");

        doc.addImage(canvas.toDataURL("image/png"), 'PNG', lMarginImage, 10, 40, 100);

        doc.text(prescription.pacient.doctor.name.toUpperCase(), pdfInMM / 2, 30, 'center')
        doc.text(prescription.pacient.doctor.profession + " | " + prescription.pacient.doctor.phone, pdfInMM / 2, 40, 'center')
        doc.text("Registro" + " " + prescription.pacient.doctor.crm, pdfInMM / 2, 50, 'center')
        var date = new Date()
        doc.text("Data " + date.toLocaleDateString(), 165, 290)


        doc.text(lMargin, 60, "Paciente: " + prescription.pacient.name)
        if (prescription.pacient.address && prescription.pacient.address.city) {
            doc.text(lMargin, 65, "Endereço: " + prescription.pacient.address.street + " - " + prescription.pacient.address.city.name + " - " + prescription.pacient.address.city.state.uf)
        } else {
            doc.text(lMargin, 65, "Endereço: Não informado")
        }
    }

    function addSecondHeader(prescription) {
        doc.setFontSize(12);
        doc.setFontType("bold");
        doc.text("RECEITUÁRIO", pdfInMM / 2, 170, 'center')
        const qr = new QRious({ value: 'https://qr-code-app.herokuapp.com/#/paciente/prescricao/' + prescription.id });
        doc.text("Via Paciente", lMarginImage, 155)
        doc.addImage(qr.toDataURL('image/png'), 'PNG', 170, 160, 30, 30);

        var img = $("#imageReceita")[0];
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");

        doc.addImage(canvas.toDataURL("image/png"), 'PNG', lMarginImage, 160, 40, 100);

        doc.text(prescription.pacient.doctor.name.toUpperCase(), pdfInMM / 2, 180, 'center')
        doc.text(prescription.pacient.doctor.profession + " | " + prescription.pacient.doctor.phone, pdfInMM / 2, 190, 'center')
        doc.text("Registro" + " " + prescription.pacient.doctor.crm, pdfInMM / 2, 200, 'center')
        var date = new Date()
        doc.text("Data " + date.toLocaleDateString(), 165, 130) // nao mudar


        doc.text(lMargin, 210, "Paciente: " + prescription.pacient.name)
        if (prescription.pacient.address && prescription.pacient.address.city) {
            doc.text(lMargin, 215, "Endereço: " + prescription.pacient.address.street + " - " + prescription.pacient.address.city.name + " - " + prescription.pacient.address.city.state.uf)
        } else {
            doc.text(lMargin, 215, "Endereço: Não informado")
        }
    }
})