
var items = [];
var count = 0;
var totalAmount = 0;

var addItem = document.getElementById('add');
addItem.addEventListener('click' , function(){
    var itemDate = document.getElementById('date').value;
    var itemDay = document.getElementById('day').value;
    var itemName = document.getElementById('item').value;
    var itemQuantity = document.getElementById('quantity').value;
    if(itemQuantity < 1) {
        alert("Wrong Input");
    }
    else {
        var itemRate = rateCard(itemName);

        var order = new FoodItem(itemName, itemQuantity, itemRate);
        items.push(order);
        display(itemDate , itemDay, order);
    }
});

function FoodItem(itemName , itemQuantity, itemRate) {
    this.itemName = itemName;
    this.itemQuantity = itemQuantity;
    this.itemRate = itemRate;
}

function display (itemDate , itemDay, order) {
    var displayBox = document.querySelector('.right-box');

    var amount = order.itemQuantity * order.itemRate;
    totalAmount = totalAmount + amount;


    if(count == 0) {
        var date = document.createElement('p');
        date.textContent = itemDate;
        displayBox.appendChild(date);

        var day = document.createElement('p');
        day.textContent = itemDay;
        displayBox.appendChild(day);

        var submitBtn = document.createElement('input');
        submitBtn.setAttribute('type' , 'submit');
        submitBtn.setAttribute('id' , 'submit');
        submitBtn.setAttribute('value' , 'Generate Bill');
        displayBox.appendChild(submitBtn);


        var billAmount = document.getElementById('submit');
        billAmount.addEventListener('click' , function(){
            generateBill(items, itemDay, displayBill);
        });
        
        count++;
    }

    var payhere = document.getElementById('submit');

    var itemInfo = document.createElement('p');
    itemInfo.textContent = order.itemName + " = " + order.itemQuantity + " = " + amount;
    displayBox.insertBefore(itemInfo, payhere);



}

function rateCard(itemName) {
    var rate = 0;
    if(itemName == "Idly Sambhar & Chutney" || itemName == "1Pcs Rasam Vada") {
        rate = 75;
    }
    else if(itemName == "Vada with Sambhar Chutney" || itemName == "1Pcs. Idly 1Pc. Vada" || itemName == "Upma") {
        rate = 90;
    }
    else if(itemName == "Dahi Idli" || itemName == "Rasam Idli with Papad") {
        rate = 100;
    }
    else if(itemName == "Dahi Vada" || itemName == "2Pcs Idli & 1Pcs Vada") {
        rate = 110;
    }
    else if(itemName == "Upma & Rava Kesari" || itemName == "Upma & 1Pcs Vada") {
        rate = 160;
    }
    else {
        rate = 75;
    }

    return rate;
}

function generateBill(items, itemDay, displayBill) {
    var paybleAmount = 0;
    var discount = random();

    for(var i = 0; i < items.length; i++) {
        paybleAmount = paybleAmount + Number(items[i].itemQuantity * items[i].itemRate);
    }
    var tips = paybleAmount * 0.05;
    var tax = paybleAmount * 0.15;

    paybleAmount = paybleAmount + tips + tax - (paybleAmount * discount);
    
    displayBill(paybleAmount , discount , tips , tax, itemDay);

}

function random() {
    var max = 0.5;
    var min = 0.3;
    var disc = Math.floor(Math.random() * (max - min)) + min;
    return disc;
}


function displayBill(finalAmount, discount , tips , tax, day) {
    var dayInfo = "Wow... Its " + day + " You Got Discount of " + 
                Math.floor(discount*100) + "% On Your Total Amount"; 
    var tipInfo = "Tip Amount On Your Total : " + tips;
    var taxInfo = "Taxable Amount : " + tax;
    var lastAmount = "Final Payble Amount : " + finalAmount;
    
    var pdiv = document.querySelector('.show');

    var para1 = document.createElement('h3');
    para1.textContent = dayInfo;
    pdiv.appendChild(para1);

    var para2 = document.createElement('h3');
    para2.textContent = tipInfo;
    pdiv.appendChild(para2);

    var para3 = document.createElement('h3');
    para3.textContent = taxInfo;
    pdiv.appendChild(para3);

    var para4 = document.createElement('h3');
    para4.textContent = lastAmount;
    pdiv.appendChild(para4); 
}
