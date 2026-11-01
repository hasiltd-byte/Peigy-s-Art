"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { RotateIcon } from "./Icons";

export default function RotatingArt() {
  const [playing, setPlaying] = useState(true);
  const [angle, setAngle] = useState(-22);
  const [interacting, setInteracting] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const turntable = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; angle: number } | null>(null);
  useEffect(() => {
    if (!window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      if (turntable.current) turntable.current.dataset.inView = String(entries[0].isIntersecting);
    });
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  function currentAngle() {
    if (!turntable.current) return angle;
    const matrix = new DOMMatrixReadOnly(getComputedStyle(turntable.current).transform);
    return Math.atan2(matrix.m31, matrix.m11) * 180 / Math.PI;
  }
  function toggleRotation() {
    if (playing) setAngle(currentAngle());
    setInteracting(false);
    setPlaying(!playing);
  }
  function start(event: PointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const displayedAngle = currentAngle();
    setAngle(displayedAngle);
    drag.current = { x: event.clientX, angle: displayedAngle };
    setInteracting(true);
    setPlaying(false);
  }
  function move(event: PointerEvent<HTMLDivElement>) {
    if (drag.current) setAngle(drag.current.angle + (event.clientX - drag.current.x) * 0.65);
  }
  function end() { drag.current = null; }
  return <div className="art-display">
    <div className="art-stage" ref={stage} onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end}>
      <div ref={turntable} className={`art-turntable${playing && !interacting ? " auto-rotate" : ""}`} style={{ "--art-angle": `${angle}deg` } as CSSProperties}>
        <div className="art-face art-front"><Image src="/images/photos/mosaic.webp" alt="צילום פסיפס בתוך מסגרת מסתובבת בהדמיית תצוגה" fill sizes="(max-width: 700px) 65vw, 330px" loading="lazy" /></div>
        <div className="art-face art-back"><span>Feigy&apos;s<br/><i>Studio.</i></span><small>חומר. צבע. נשמה.</small></div>
        <div className="art-edge art-edge-right" /><div className="art-edge art-edge-left" />
      </div>
      <div className="art-shadow" /><span className="stage-coordinate">OBJECT / 001</span><span className="stage-degree" aria-hidden="true">360°</span>
    </div>
    <div className="art-controls"><button type="button" className="rotate-control" onClick={toggleRotation} aria-pressed={playing}>{playing ? <span aria-hidden="true">Ⅱ</span> : <RotateIcon size={16} />}{playing ? "עצירת סיבוב" : "סיבוב אוטומטי"}</button><span>גררו לסיבוב · הדמיית תצוגה</span></div>
    <label className="rotation-slider">זווית התצוגה<input type="range" min="-180" max="180" value={((angle + 180) % 360 + 360) % 360 - 180} onChange={event => { setPlaying(false); setInteracting(true); setAngle(Number(event.target.value)); }} aria-label="סיבוב מסגרת היצירה באמצעות המקלדת או בגרירה" /></label>
  </div>;
}
