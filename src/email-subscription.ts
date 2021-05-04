let template = document.createElement("template");
template.innerHTML = `
<style>
    @import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';

    * {
        box-sizing: border-box;
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
        text-decoration: none;
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
    <p>Subscribe to our newsletter</p>
    <form>
        <input placeholder="Please enter your email and press Enter." type="email" />
    </form>
</div>
`;

class EmailSubscription extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const floatingWidget: HTMLElement = this.shadowRoot.querySelector(
      ".floating-widget"
    );
    floatingWidget.style.backgroundColor =
      this.getAttribute("color") || "#5C00F5";
    floatingWidget.style.color = this.getAttribute("iconColor") || "#fff";
    floatingWidget.querySelector("i").className =
      this.getAttribute("icon") || "far fa-envelope";

    this.appendStyle(
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
    );
  }

  connectedCallback() {
    this.shadowRoot.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(this.shadowRoot.querySelector("input").value);
    });
  }

  disConnectedCallback() {}

  appendStyle(url: string) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    document.head.appendChild(link);
  }
}

window.customElements.define("email-subscription", EmailSubscription);
