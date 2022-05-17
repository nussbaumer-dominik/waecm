class CookieBanner extends HTMLElement {
    shadowRoot;

    constructor() {
        super();

        const cookieAccepted = this.getCookie('cookie.banner.accepted');
        let bannerState = '';

        if (cookieAccepted !== null) {
           // bannerState = 'hidden';
        }

        this.shadowRoot = this.attachShadow({mode: 'closed'});

        const style = document.createElement('style');
        style.textContent = `
            .hidden{
            display:none;
            }
            .green{
            background-color:green;
            color:white;
            }
            .cancel{
            background-color:red;
            color:white;
            }
            button:hover{
            cursor:pointer;
            }
        `;
        this.shadowRoot.appendChild(style.cloneNode(true));

        const template = document.createElement('template');
        template.innerHTML = `
        <div class="cookie-banner ${bannerState}">
            <slot name="title"><h3>Cookie akzeptieren</h3></slot>
            <slot name="text"><p>Wir verwenden cookies weil das so ist</p></slot>
            <p class="cookie-sources">
                <label><input type="checkbox" name="required" disabled checked> Notwendige</label>
                <label><input type="checkbox" name="statistics">Statistiken</label>
                <label><input type="checkbox" name="marketing">Marketing</label>
            </p>
            <button class="confirm">Speichern</button>
            <button class="cancel">Alle Ablehen</button>
            <button class="green">Alle Akzeptieren</button>
        </div>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }

    connectedCallback() {
        const element = this;
        this.shadowRoot.querySelector('button.confirm').addEventListener('click', function (event) {
            element.eraseCookie('cookie.banner.accepted')
            element.eraseCookie('cookie.banner.all')
            element.setCookie('cookie.banner.required', true, 30);
            element.setCookie('cookie.banner.accepted', true, 30);

            element.shadowRoot.querySelectorAll('.cookie-sources input[type="checkbox"]:checked').forEach(function (source) {
                element.setCookie(`cookie.banner.${source.name}`, true, 30);
            });
            element.hideCookieBanner();
        });
        this.shadowRoot.querySelector('button.cancel').addEventListener('click', function (event) {
            element.eraseCookie('cookie.banner.accepted')
            element.eraseCookie('cookie.banner.all')
            element.setCookie('cookie.banner.required', true, 30);

            element.hideCookieBanner();
        });
        this.shadowRoot.querySelector('button.green').addEventListener('click', function (event) {
            element.setCookie('cookie.banner.required', true, 30);
            element.setCookie('cookie.banner.all', true, 30);
            element.setCookie('cookie.banner.accepted', true, 30);
            element.hideCookieBanner();
        });

    }

    hideCookieBanner() {
        this.shadowRoot.querySelector('.cookie-banner').classList.add('hidden');
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    eraseCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}

customElements.define('cookie-banner', CookieBanner);
