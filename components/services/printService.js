angular.module('prescritor').service('printService', function ($rootScope, $location, toast) {

    this.onePage = (prescription) => {
        var lMargin = 15; //left margin in mm
        var rMargin = 15; //right margin in mm
        var pdfInMM = 210; // width of A4 in mm

        var doc = new jsPDF("p", "mm", "a4");
        var paragraph = "Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design. Apple's iPhone 7 is officially upon us. After a week of pre-orders, the latest in the iPhone lineup officially launches today.\n\nEager Apple fans will be lining up out the door at Apple and carrier stores around the country to grab up the iPhone 7 and iPhone 7 Plus, while Android owners look on bemusedly.\n\nDuring the Apple Event last week, the tech giant revealed a number of big, positive changes coming to the iPhone 7. It's thinner. The camera is better. And, perhaps best of all, the iPhone 7 is finally water resistant.\n\nStill, while there may be plenty to like about the new iPhone, there's plenty more that's left us disappointed. Enough, at least, to make smartphone shoppers consider waiting until 2017, when Apple is reportedly going to let loose on all cylinders with an all-glass chassis design.";

        var lines = doc.splitTextToSize(paragraph, (pdfInMM - lMargin - rMargin));
        doc.text(80, 20, "Prescrição Médica")
        doc.text(lMargin, 35, "Dados do prescritor")
        doc.text(lMargin, 45, "Nome: " + prescription.pacient.doctor.name)
        doc.text(120, 45, "Profissão: " + prescription.pacient.doctor.profession)
        doc.text(lMargin, 55, "Telefone: " + prescription.pacient.doctor.phone)
        doc.text(120, 55, "Registro: " + prescription.pacient.doctor.typeNumber + " " + prescription.pacient.doctor.number)
        
        doc.text(lMargin, 70, "Dados do paciente")
        doc.text(lMargin, 80, "Nome: " + prescription.pacient.name)
        doc.text(120, 80, "Nascimento: " + prescription.pacient.date)
        
        doc.text(lMargin, 95, "Medicamentos prescritos")
        let top = 105
        prescription.prescriptions.forEach(function(element){
            if(top > 210){
                doc.addPage();
                top = 20
            }
            doc.text(lMargin, top, "Nome: " + element.medicament.name)            
            doc.text(120, top, "Apresentação: " + element.apresentation)            
            doc.text(lMargin, top+=10, "Nome(s) comercial(is):")            
            element.comercialName.forEach(function(name){
                doc.text(lMargin, top+=10, " - " + name)            
            })       
            doc.text(lMargin, top+=10, "Quantidade: " + element.quantity + " " + element.unity.name)            
            doc.text(lMargin, top+=10, "Forma de uso: " + element.useType.name)            
            doc.text(lMargin, top+=10, "Descrição: " + element.description)            
            top+=20
        })

        //doc.text(lMargin, 20, lines);
        const qr = new QRious({ value: 'http://prescritor-qrCode.com/prescricao/' + prescription.id });
        doc.addImage(qr.toDataURL('image/png'), 'PNG', 80, top, 50, 50);
        doc.save('Generated.pdf');
    }
})