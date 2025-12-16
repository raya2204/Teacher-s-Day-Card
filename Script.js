// ==================== CONFIGURATION ==================== 
const defaultConfig = {
    card_title: "Happy Teacher's Day!",
    teacher_name: "Mrs. Johnson",
    message_body: "Thank you for being an amazing teacher and inspiring us every day. Your dedication, patience, and wisdom have made a lasting impact on our lives. You don't just teach lessons; you teach us how to learn, grow, and believe in ourselves.",
    signature: "Your loving students",
    header_background_start: "#667eea",
    header_background_end: "#764ba2",
    card_background: "#ffffff",
    teacher_name_color: "#667eea",
    message_text_color: "#2d3748",
    font_family: "Georgia, serif",
    font_size: 16
};

// ==================== CONFIG CHANGE HANDLER ==================== 
async function onConfigChange(config) {
    // Update text content
    const cardTitleEl = document.getElementById('cardTitle');
    const teacherNameEl = document.getElementById('teacherName');
    const messageBodyEl = document.getElementById('messageBody');
    const signatureEl = document.getElementById('signature');

    if (cardTitleEl) {
        cardTitleEl.textContent = config.card_title || defaultConfig.card_title;
    }
    if (teacherNameEl) {
        teacherNameEl.textContent = config.teacher_name || defaultConfig.teacher_name;
    }
    if (messageBodyEl) {
        messageBodyEl.textContent = config.message_body || defaultConfig.message_body;
    }
    if (signatureEl) {
        signatureEl.textContent = config.signature || defaultConfig.signature;
    }

    // Update colors
    const headerBgStart = config.header_background_start || defaultConfig.header_background_start;
    const headerBgEnd = config.header_background_end || defaultConfig.header_background_end;
    const cardBg = config.card_background || defaultConfig.card_background;
    const teacherNameColor = config.teacher_name_color || defaultConfig.teacher_name_color;
    const messageColor = config.message_text_color || defaultConfig.message_text_color;

    const cardHeader = document.querySelector('.card-header');
    const cardFooter = document.querySelector('.card-footer');
    const cardWrapper = document.querySelector('.card-wrapper');
    const teacherNameDisplay = document.querySelector('.teacher-name-display');
    const messageContent = document.querySelector('.message-content');

    if (cardHeader) {
        cardHeader.style.background = `linear-gradient(135deg, ${headerBgStart} 0%, ${headerBgEnd} 100%)`;
    }
    if (cardFooter) {
        cardFooter.style.background = `linear-gradient(135deg, ${headerBgStart} 0%, ${headerBgEnd} 100%)`;
    }
    if (cardWrapper) {
        cardWrapper.style.background = cardBg;
    }
    if (teacherNameDisplay) {
        teacherNameDisplay.style.color = teacherNameColor;
    }
    if (messageContent) {
        messageContent.style.color = messageColor;
    }

    // Update font
    const customFont = config.font_family || defaultConfig.font_family;
    const baseFontStack = 'Georgia, serif';
    const mainWrapper = document.querySelector('.main-wrapper');

    if (mainWrapper) {
        mainWrapper.style.fontFamily = `${customFont}, ${baseFontStack}`;
    }

    // Update font size (This logic seems to scale based on baseSize)
    const baseSize = config.font_size || defaultConfig.font_size;
    if (cardTitleEl) {
        // 3rem corresponds to 48px if base font-size is 16px, so 3 * 16 = 48 -> 1.875 * 16 = 30px (2rem?)
        cardTitleEl.style.fontSize = `${baseSize * 1.875}px`; 
    }
    if (teacherNameEl) {
        // 2.2rem corresponds to 35.2px if base font-size is 16px, so 1.375 * 16 = 22px
        teacherNameEl.style.fontSize = `${baseSize * 1.375}px`;
    }
    if (messageBodyEl) {
        // 1.3rem corresponds to 20.8px if base font-size is 16px, so 0.8125 * 16 = 13px
        messageBodyEl.style.fontSize = `${baseSize * 0.8125}px`;
    }
    if (signatureEl) {
        // 1.5rem corresponds to 24px if base font-size is 16px, so 0.9375 * 16 = 15px
        signatureEl.style.fontSize = `${baseSize * 0.9375}px`;
    }
}

// ==================== CAPABILITIES MAPPING ==================== 
function mapToCapabilities(config) {
    return {
        recolorables: [
            {
                get: () => config.header_background_start || defaultConfig.header_background_start,
                set: (value) => {
                    config.header_background_start = value;
                    window.elementSdk.setConfig({ header_background_start: value });
                }
            },
            {
                get: () => config.card_background || defaultConfig.card_background,
                set: (value) => {
                    config.card_background = value;
                    window.elementSdk.setConfig({ card_background: value });
                }
            },
            {
                get: () => config.teacher_name_color || defaultConfig.teacher_name_color,
                set: (value) => {
                    config.teacher_name_color = value;
                    window.elementSdk.setConfig({ teacher_name_color: value });
                }
            },
            {
                get: () => config.message_text_color || defaultConfig.message_text_color,
                set: (value) => {
                    config.message_text_color = value;
                    window.elementSdk.setConfig({ message_text_color: value });
                }
            }
        ],
        borderables: [],
        fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
                config.font_family = value;
                window.elementSdk.setConfig({ font_family: value });
            }
        },
        fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
                config.font_size = value;
                window.elementSdk.setConfig({ font_size: value });
            }
        }
    };
}

// ==================== EDIT PANEL MAPPING ==================== 
function mapToEditPanelValues(config) {
    return new Map([
        ["card_title", config.card_title || defaultConfig.card_title],
        ["teacher_name", config.teacher_name || defaultConfig.teacher_name],
        ["message_body", config.message_body || defaultConfig.message_body],
        ["signature", config.signature || defaultConfig.signature]
    ]);
}

// ==================== SDK INITIALIZATION ==================== 
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}

// The immediately invoked function at the end seems to be for a content delivery network (CDN) challenge/script, 
// which is usually injected by the environment and not part of the core application logic. 
// It is omitted here for clean separation. 
