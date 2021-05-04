let template = document.createElement("template");
template.innerHTML = `
<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
		@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');

    * {
        box-sizing: border-box;
    }

    a {
        display: inline-block;
        text-decoration: none;
    }

    a span {
        color: white;
        font-weight: bold;
    }

    .floating-widget {
        display: flex;
        position: fixed;
        width: 60px;
        height: 60px;
        bottom: 20px;
        right: 25px;
        background-color: #5C00F5;
        color: #fff;
        border-radius: 50px;
        text-align: center;
        box-shadow: 2px 2px 3px #999;
        align-items: center;
        justify-content: center;
    }

    .floating-popup.show {
        opacity: 1;
    }

    .floating-popup {
        position: fixed;
        width: calc(100% - 75px);
        max-width: 300px;
        bottom: 90px;
        right: 25px;
        padding: 10px;
        background-color: #5C00F5;
        border-radius: 10px;
        color: white;
        box-shadow: 2px 2px 3px #999;    
        text-align: center;
        opacity: 0;
				font-family: 'Roboto', sans-serif;
        transition: opacity 0.4s;
    }

    .floating-popup p {
        margin: 5px 10px 10px;
        font-weight: bold;
    }

    input {
        width: 100%;
        background: transparent;
        border: none;
        outline: none;
        color: white;
        padding: 8px 15px;
        border-bottom: solid 1px rgba(255, 255, 255, .5);
    }

    input:focus {
        border-bottom: solid 1px white;
    }

    .powered-by {
        font-size: 12px;
        text-align: center;
        color: #ccc;
        margin-top: 20px;
    }

    ::placeholder {
        color: rgba(255, 255, 255, .7);
    }
    
    :-ms-input-placeholder {
        color: rgba(255, 255, 255, .7);
    }
    
    ::-ms-input-placeholder {
        color: rgba(255, 255, 255, .7);
    }
</style>

<a href="#" class="floating-widget">
    <i class="far fa-envelope"></i>
</a>

<div class="floating-popup">
    <p id="subscripe-message">Subscribe to our newsletter</p>
    <p class="thanks-message" style="display:none">Thanks for subscribing to Dalia's newsletter.</p>
    <p class="thanks-message" style="display:none; font-size: 12px; opacity: 0.5; margin-bottom: 0">This will be hidden after <span id="counter">5</span> seconds</p>
    <form>
        <input placeholder="Please enter your email and press Enter." type="email" required />
        <a class="powered-by" href="https://www.dalialabs.com/" target="_blank">
            Powered by <span>Dalia</span>
        </a>
    </form>
</div>
`;

class EmailSubscription extends HTMLElement {
  callback: string;
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const floatingWidget: HTMLElement = this.shadowRoot.querySelector(
      ".floating-widget"
    );

    floatingWidget.querySelector("i").className =
      this.getAttribute("icon") || "far fa-envelope";

    this.callback = this.getAttribute("onSubmit") || "";

    this.appendStyle(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    );
  }

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  submitEmail = (e) => {
    e.preventDefault();
    let count = 5;
    const counter = this.shadowRoot.getElementById("counter");
    const emailInput = this.shadowRoot.querySelector("input");

    if (this.validateEmail(emailInput.value)) {
      fetch("https://dalia-task.herokuapp.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailInput.value }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (this.callback && this.callback != "") window[this.callback]();

          emailInput.style.display = "none";
          this.shadowRoot.getElementById("subscripe-message").style.display =
            "none";
          this.shadowRoot
            .querySelectorAll(".thanks-message")
            .forEach((item: HTMLElement) => (item.style.display = "block"));

          const interval = setInterval(() => {
            if (count == 0) clearInterval(interval);
            else count--;
            counter.innerText = count.toString();
          }, 1000);

          setTimeout(() => {
            this.shadowRoot.querySelector(".floating-widget").remove();
            this.shadowRoot.querySelector(".floating-popup").remove();
          }, 5000);
        });
    }
  };

  togglePopUp = (e) => {
    const floatingPop = this.shadowRoot.querySelector(".floating-popup");
    const emailInput = this.shadowRoot.querySelector("input");

    floatingPop.classList.toggle("show");
    emailInput.value = "";

    let floatingWidget = this.shadowRoot.querySelector(".floating-widget");
    if (floatingPop.classList.contains("show"))
      floatingWidget.querySelector("i").className =
        this.getAttribute("iconOpened") || "far fa-envelope-open";
    else
      floatingWidget.querySelector("i").className =
        this.getAttribute("icon") || "far fa-envelope";
  };

  connectedCallback() {
    this.shadowRoot
      .querySelector("form")
      .addEventListener("submit", this.submitEmail);

    this.shadowRoot
      .querySelector(".floating-widget")
      .addEventListener("click", this.togglePopUp);
  }

  disConnectedCallback() {
    this.shadowRoot
      .querySelector("form")
      .removeEventListener("submit", this.submitEmail);

    this.shadowRoot
      .querySelector(".floating-widget")
      .removeEventListener("click", this.togglePopUp);
  }

  appendStyle(url: string) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}

window.customElements.define("email-subscription", EmailSubscription);
