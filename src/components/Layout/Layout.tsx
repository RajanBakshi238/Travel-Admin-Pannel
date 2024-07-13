import React from "react";
import "./../../style.scss"
export default function Layout({ children }: { children: React.ReactNode }) {
    return <div className="dashboard-ty"><div className="main-wrapper">{children}</div></div>;
}
