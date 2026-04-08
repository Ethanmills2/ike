import { useEffect, useRef, useState } from 'react';
import './DeviceBadge.css';

type Device = 'mobile' | 'tablet' | 'desktop';

const MOBILE_BP = 768;
const TABLET_BP = 1024;

const dCfg: Record<Device, { label: string; dotClass: string; icon: string }> = {
  mobile:  { label: 'Mobile View',  dotClass: 'mobile',  icon: '📱' },
  tablet:  { label: 'Tablet View',  dotClass: 'tablet',  icon: '📲' },
  desktop: { label: 'Desktop View', dotClass: 'desktop', icon: '🖥️' },
};

function getDevice(): Device {
  const w = window.innerWidth;
  return w < MOBILE_BP ? 'mobile' : w < TABLET_BP ? 'tablet' : 'desktop';
}

export default function DeviceBadge() {
  const [device, setDevice] = useState<Device>(() => getDevice());
  const [visible, setVisible] = useState(false);
  const [hiding, setHiding]   = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const prevDevice = useRef<Device>(device);

  useEffect(() => {
    const onResize = () => {
      const d = getDevice();
      if (d === prevDevice.current) return;
      prevDevice.current = d;
      setDevice(d);
      setHiding(false);
      setVisible(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setHiding(true);
        setTimeout(() => { setVisible(false); setHiding(false); }, 500);
      }, 2800);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  if (!visible) return null;
  const cfg = dCfg[device];

  return (
    <div id="device-badge" className={hiding ? 'hide-out' : 'show'}>
      <div className={`device-dot ${cfg.dotClass}`} />
      <span>{cfg.icon}&nbsp;&nbsp;{cfg.label}</span>
    </div>
  );
}
