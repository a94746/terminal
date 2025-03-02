import {useEffect} from "react";
import {useLocation} from "react-router-dom";

export default function Title() {
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case '/':
                document.title = 'Welcome';
                break;
            case '/t':
                document.title = 'Terminal';
                break;
            default:
                document.title = 'Not found';
        }
    }, [location]);

    return null; // Этот компонент ничего не рендерит
}