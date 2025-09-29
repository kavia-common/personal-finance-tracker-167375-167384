import { useEffect, useState } from "react";
import { Card, Switch, Notice } from "../shared";

export default function Settings() {
  const [dark, setDark] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const onSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  };

  return (
    <div className="stack-lg">
      <Card title="Appearance" subtitle="Theme preferences">
        <div className="row">
          <div>
            <strong>Dark Mode</strong>
            <div className="muted">Switch between light and dark theme</div>
          </div>
          <Switch checked={dark} onChange={setDark} />
        </div>
      </Card>

      <Card title="Data" subtitle="Service endpoints">
        <div className="row between">
          <div>
            <strong>API Base URL</strong>
            <div className="muted">{process.env.REACT_APP_API_BASE_URL || "/api"}</div>
          </div>
          <button className="btn ghost" onClick={onSave}>Save</button>
        </div>
        {saved && <Notice type="success" text="Settings saved." />}
      </Card>
    </div>
  );
}
