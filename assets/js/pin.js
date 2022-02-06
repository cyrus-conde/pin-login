class PinLogin {
    constructor ({el, redirectTo, maxNumbers = 4, pincode = 1234}) {
        this.el = {
            main: el,
            numPad: el.querySelector(".pin-login__numpad"),
            textDisplay: el.querySelector(".pin-login__text")
        };

        this.redirectTo = redirectTo;
        this.maxNumbers = maxNumbers;
        this.value = "";
        this.pincode = pincode;
        this._generatePad();
    }

    _generatePad() {
        const padLayout = [
            "1", "2", "3",
            "4", "5", "6",
            "7", "8", "9",
            "x", "0", "<"
        ];

        padLayout.forEach(key => {
            const insertBreak = key.search(/[369]/) !== -1;
            const keyEl = document.createElement("div");
            const row = document.createElement("div");


            keyEl.classList.add("pin-login__key");
            keyEl.textContent = key;
            keyEl.addEventListener("click", () => { this._handleKeyPress(key) });
            this.el.numPad.appendChild(keyEl);

            if (insertBreak) {
                this.el.numPad.appendChild(document.createElement("br"));
            }
        });
    }

    _handleKeyPress(key) {
        switch (key) {
            case "<":
                this.value = this.value.substring(0, this.value.length - 1);
                break;
			case "x":
				this.value = "";
				break;               
            default:
                if (this.value.length < this.maxNumbers && !isNaN(key)) {
                    this.value += key;
                    if(this.value.length == 4){
                    	this._attemptLogin();
                    }
                }

                break;
        }

        this._updateValueText();
    }

    _updateValueText() {
        this.el.textDisplay.value = "_".repeat(this.value.length);
        this.el.textDisplay.classList.remove("pin-login__text--error");
    }

    _attemptLogin() {
        if (this.value.length == 4) {
        	if(this.value == this.pincode){
        		alert("success");
        		window.location.href = this.redirectTo;
        		
        	}else{
        		alert("wrong pincode");
        		this.value = "";
        	}
        	
        }
    }
}

new PinLogin({
    el: document.getElementById("mainPinLogin"),
    redirectTo: "dashboard.html"
});