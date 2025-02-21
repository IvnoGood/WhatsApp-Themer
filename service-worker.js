const landingObserver = new MutationObserver(() => {
    const chatContainer = document.querySelector(".x10l6tqk.x1vjfegm.x9f619.x78zum5.x1iyjqo2.x6s0dn4.xl56j7k.xh8yej3.x5yr21d.x7sb2j6.x84yb8i.xt0e3qv.xsknx04");
    if (chatContainer) {
        landingObserver.disconnect();
        if (localStorage.getItem("custom-theme") && localStorage.getItem("custom-theme") !== undefined) {
            const json = JSON.parse(localStorage.getItem("custom-theme"));
            App(json);
        } else {
            localStorage.setItem("custom-theme", undefined)
            App(undefined);
        }
    }
});

const mainObserver = new MutationObserver(() => {
    const chatContainer = document.getElementById("main");
    if (chatContainer) {
        mainObserver.disconnect();
        if (localStorage.getItem("custom-theme") && localStorage.getItem("custom-theme") !== undefined) {
            const json = JSON.parse(localStorage.getItem("custom-theme"));
            main(json);
        } else {
            localStorage.setItem("custom-theme", undefined)
            main(undefined);
        }
    }
});

landingObserver.observe(document.body, { childList: true, subtree: true });
mainObserver.observe(document.body, { childList: true, subtree: true });

async function setBlobBackground(element, json) {
    const response = await fetch(json.config.backgroundImg);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    element.style.background = `url(${url})`;
}

function uploadTheme() {

    const fileInput = document.createElement("input");
    const fileButton = document.createElement("div")
    fileButton.innerHTML = `<div class="_ajv7 x1n2onr6 x1okw0bk x5yr21d x14yjl9h xudhj91 x18nykt9 xww2gxu xlkovuz x16j0l1c xyklrzc x1mh8g0r x1anpbxc x18wx58x xo92w5m">
    <button aria-disabled="false" role="button" tabindex="0" class="x78zum5 x6s0dn4 x1afcbsf x1heor9g x1y1aw1k x1sxyh0 xwib8y2 xurb0ha" data-tab="2" title=""
        aria-label="Settings">
        <div class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 xeuugli x2lwn1j xl56j7k x1q0g3np x6s0dn4 xvy4d1p xxk0z11">
            <span aria-hidden="true" data-icon="settings-outline" class="">
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
    <path
        d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
</svg>
            </span>
        </div>
    </button>
    </div>`
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('accept', '.json');
    fileInput.style.display = "none"
    const targetDiv = document.querySelector(".x1c4vz4f.xs83m0k.xdl72j9.x1g77sc7.xeuugli.x2lwn1j.xozqiw3.x1oa3qoh.x12fk4p8.xyorhqc");
    targetDiv.style.width = "40px";
    targetDiv.prepend(fileInput);
    targetDiv.prepend(fileButton)

    fileButton.addEventListener("click", () => {
        fileInput.click();
    })

    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;

        const file = files[0];

        const reader = new FileReader();
        reader.onload = function () {
            const contents = JSON.parse(reader.result);
            if (contents.type) {
                if (contents.type !== "WhatsAppTheme") {
                    window.alert("File not a valid theme file", contents.type);
                } else {
                    localStorage.setItem("custom-theme", JSON.stringify(contents));
                    window.location.reload()
                }
            } else {
                window.alert("File not a valid theme file", contents.type);
            }
        };
        reader.readAsText(file);
    });
}

function App(json) {

    if (json == undefined) {
        window.alert("Upload a theme to continue")
        uploadTheme()
        return
    }
    uploadTheme()
    const root = document.querySelector(".dark");

    if (json.config.enableTheming) {
        Object.entries(json.colors).forEach(([key, value]) => {
            if (value !== "") root.style.setProperty(key, value)
        });
    } else if (json.config.enableAlerts) {
        window.alert("Custom themes are currently switched off");
    }

    const element = document.querySelector('.x10l6tqk.x1vjfegm.x9f619.x78zum5.x1iyjqo2.x6s0dn4.xl56j7k.xh8yej3.x5yr21d.x7sb2j6.x84yb8i.xt0e3qv.xsknx04');
    element.innerHTML = ""
    element.style.paddingTop = 0
    element.style.paddingBottom = 0
    element.style.backgroundColor = ""

    /* element.style.background = `url(${url})` */
    setBlobBackground(element, json);

}

function main(json) {

    if (json == undefined) {
        window.alert("Upload a theme to continue")
        uploadTheme()
        return
    }

    const root = document.querySelector(".dark");

    if (json.config.enableTheming) {
        Object.entries(json.colors.main).forEach(([key, value]) => {
            if (value !== "") root.style.setProperty(key, value)
        });
    }
}