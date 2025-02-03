import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
    return (
        <div className="Layout">
            <aside>
                <Menu />
            </aside>
            <main>
                <Routing />
            </main>
        </div>
    );
}
