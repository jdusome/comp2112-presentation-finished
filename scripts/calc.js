/*
//================================================================================
// Variables
//================================================================================
*/
const electron = require('electron');
const { ipcRenderer } = electron;

/*
//================================================================================
// Calculator App
//================================================================================
*/
const app = new Vue({

    el: "#calc",
    data: {
        number1: undefined,
        number2: undefined,
        result: undefined,
        resultLength: 0,
        selection: 1,
        theme: "dark",
        operator: undefined
    },
    mounted() {

        //Setup Theme Event Listener
        ipcRenderer.on("main:switch-theme", this.switchTheme);

    },
    methods: {
        /**
         * Function called when a number is input
         * @param {event} Event - Number Key Press
         */
        inputNumber(event) {
            let number = parseInt(event.target.dataset.number);

            //Clear Current Calculation
            if (this.selection === 2 && this.result != undefined) {
                this.number1 = undefined;
                this.number2 = undefined;
                this.result = undefined;
                this.resultLength = 0;
                this.operator = undefined;
                this.selection = 1;
            }
            //First Number
            if (
                this.selection === 1 &&
                (this.number1 == undefined || this.number1.toString().length < 6)
            ) {
                if (this.number1 == undefined) {
                    this.number1 = number;
                } else {
                    this.number1 = parseInt("" + this.number1 + number);
                }
            }
            //Second Number
            else if (
                this.selection === 2 &&
                (this.number2 == undefined || this.number2.toString().length < 6)
            ) {
                if (this.number2 == undefined) {
                    this.number2 = number;
                } else {
                    this.number2 = parseInt("" + this.number2 + number);
                }
            }
        },

        /**
         * Function called when the equal sign is pressed, used to calculate result
         */
        calculate() {
            let res = 0;
            if (this.number1 === undefined || this.number2 === undefined) {
                return;
            } else {
                switch (this.operator) {
                    case "/":
                        res = parseInt(this.number1 / this.number2);
                        this.result = res.toString();
                        this.resultLength = this.result.length;
                        break;
                    case "*":
                        res = parseInt(this.number1 * this.number2);
                        this.result = res.toString();
                        this.resultLength = this.result.length;
                        break;
                    case "-":
                        res = parseInt(this.number1 - this.number2);
                        this.result = res.toString();
                        this.resultLength = this.result.length;
                        break;
                    case "+":
                        res = parseInt(this.number1 + this.number2);
                        this.result = res.toString();
                        this.resultLength = this.result.length;
                        break;
                }
            }
        },

        /**
         * Function used when an operator key is pressed, assigns operator and then assigns number1 and moves on to number 2
         * @param {event} Event - Operator Key Press
         */
        assignOperator(event) {
            this.operator = event.target.dataset.operator;
            this.selection = 2;
        },

        /**
         * Function used to clear current line, or clear all lines depending on which button was pressed
         * @param {*} Event - Clear / Clear All Key Press
         */
        clear(event) {

            let operation = event.target.dataset.operation;

            switch (operation) {

                //Clear All
                case "CE":
                    this.number1 = undefined;
                    this.number2 = undefined;
                    this.result = undefined;
                    this.resultLength = 0;
                    this.operator = undefined;
                    this.selection = 1;
                    break;

                //Clear Current Line
                case "C":
                    if (this.selection == 1) {
                        this.number1 = undefined;
                    }
                    else {
                        this.number2 = undefined;
                    }
                    break;

                //Delete
                case "DEL":
                    if (this.selection == 1) {
                        if (this.number1 != undefined) {
                            let number1Str = this.number1.toString();
                            number1Str = number1Str.substring(0, number1Str.length - 1);

                            if (number1Str != "") {
                                this.number1 = parseInt(number1Str);
                            }
                            else {
                                this.number1 = undefined;
                            }
                        }
                    }
                    else {
                        if (this.number2 != undefined) {
                            let number2Str = this.number2.toString();
                            number2Str = number2Str.substring(0, number2Str.length - 1);

                            if (number2Str != "") {
                                this.number2 = parseInt(number2Str);
                            }
                            else {
                                this.number2 = undefined;
                            }
                        }
                    }
                    break;
            }
        },

        /**
         * This function is used to set the calculator theme.
         * @param {String} theme - This is the theme that will be applied to the calculator
         */
        switchTheme(sender, theme){
            
            //Assign New Theme
            this.theme = theme;
        }
    }
});
