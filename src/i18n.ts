import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    // Thêm các chuỗi cần dịch của bạn ở đây
                    "welcome": "Welcome to your Dashboard!",
                    "get_started": "Get Started",
                    "statistics": "Statistics",
                    "recent_activity": "Recent Activity"
                },
            },
        },
        lng: 'en', // Ngôn ngữ mặc định
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false, // Không cần thiết cho React
        },
    });

export default i18n;
