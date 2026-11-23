import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Layers3, MessageCircle, Target, Zap } from 'lucide-react';
import { trackEvent } from '../../lib/analytics';
import './DariIdeJadiDampak.css';

const whatsappUrl = 'https://wa.me/6281999900900?text=Halo%20Utero%2C%20saya%20tertarik%20kampanye%20Dari%20Ide%20Jadi%20Dampak%20dan%20ingin%20konsultasi%20arah%20brand.';

const problems = [
  'Strategi bagus berhenti di presentasi.',
  'Vendor terpisah membuat pesan dan visual tidak konsisten.',
  'Aktivasi berjalan, tetapi dampaknya sulit diukur.',
];

const capabilities = [
  'Strategi & Konsultasi', 'Desain & Kreatif', 'Advertising & Signage', 'Digital Marketing',
  'Media & Publikasi', 'Event & Aktivasi', 'Teknologi & Sistem',
];

const steps = [
  { number: '01', title: 'Identifikasi', text: 'Kami bedah tujuan bisnis, hambatan, audiens, dan prioritas Anda.' },
  { number: '02', title: 'Arah Strategis', text: 'Kami susun pesan, kanal, dan bentuk aktivasi yang saling menguatkan.' },
  { number: '03', title: 'Eksekusi Terpadu', text: 'Tim spesialis bergerak dalam satu arah, dari konsep sampai produksi.' },
  { number: '04', title: 'Ukur & Kembangkan', text: 'Hasil ditinjau untuk menentukan perbaikan dan langkah pertumbuhan berikutnya.' },
];

function CampaignCta({ placement, label = 'Konsultasi Arah Brand' }: { placement: string; label?: string }) {
  return (
    <a className="impact-cta" href={whatsappUrl} target="_blank" rel="noopener noreferrer"
      onClick={() => trackEvent('campaign_cta_click', { campaign: 'dari_ide_jadi_dampak', placement })}>
      <MessageCircle aria-hidden="true" size={20} />{label}<ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}

export default function DariIdeJadiDampak() {
  return (
    <main className="impact-page">
      <Helmet>
        <title>Dari Ide Jadi Dampak | Utero Indonesia</title>
        <meta name="description" content="Satukan strategi, kreativitas, aktivasi, dan teknologi bersama Utero Indonesia. Mulai dengan konsultasi arah brand gratis." />
        <meta property="og:title" content="Dari Ide Jadi Dampak | Utero Indonesia" />
        <meta property="og:description" content="Satu tim untuk membawa ide bisnis dari konsep menuju eksekusi yang nyata." />
        <meta property="og:image" content="https://uteroindonesia.com/images/campaigns/dari-ide-jadi-dampak/linkedin-1200x627.png" />
      </Helmet>

      <section className="impact-hero" aria-labelledby="impact-title">
        <div className="impact-noise" aria-hidden="true" />
        <div className="impact-hero-copy">
          <span className="impact-kicker">Utero Indonesia / Integrated Creative Campaign</span>
          <h1 id="impact-title">Dari Ide<br />Jadi <em>Dampak.</em></h1>
          <p>Satu tim untuk menyatukan strategi, desain, aktivasi, media, dan teknologi. Ide tidak berhenti sebagai konsep. Ide bergerak menjadi hasil nyata.</p>
          <div className="impact-actions">
            <CampaignCta placement="hero" />
            <a className="impact-text-link" href="#cara-kerja">Lihat cara kerja <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="impact-proof-strip" aria-label="Bukti utama Utero Indonesia">
            <strong>Sejak 1998</strong><span>25+ tahun pengalaman</span><span>7 divisi terintegrasi</span><span>Berakar di Malang, bekerja untuk Indonesia</span>
          </div>
        </div>
        <div className="impact-hero-visual" aria-hidden="true">
          <div className="impact-system-card">
            <div className="impact-system-topbar">
              <div className="impact-system-brand">
                <span className="impact-system-dots"><i /><i /><i /></span>
                Creative Operating System
              </div>
              <span className="impact-system-status"><i /> Live</span>
            </div>

            <div className="impact-system-flow">
              <div className="impact-flow-node">
                <span>Input</span>
                <strong>IDE</strong>
              </div>
              <div className="impact-flow-track"><i /></div>
              <div className="impact-flow-node impact-flow-node-output">
                <span>Output</span>
                <strong>DAMPAK</strong>
              </div>
            </div>

            <div className="impact-system-grid">
              {capabilities.map((item, index) => (
                <div className="impact-system-service" key={item}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item}</strong>
                  <i />
                </div>
              ))}
            </div>

            <div className="impact-system-metrics">
              <div><strong>7</strong><span>Divisi</span></div>
              <div><strong>1</strong><span>Arah</span></div>
              <div><strong>∞</strong><span>Kemungkinan</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="impact-problem">
        <div><span className="impact-section-label">Masalah yang sering terjadi</span><h2>Banyak ide.<br />Terlalu banyak celah eksekusi.</h2></div>
        <div className="impact-problem-list">
          {problems.map((problem, index) => <article key={problem}><span>0{index + 1}</span><p>{problem}</p></article>)}
        </div>
      </section>

      <section className="impact-solution" aria-labelledby="solution-title">
        <div className="impact-solution-heading">
          <span className="impact-section-label">Satu rumah kreatif</span><h2 id="solution-title">Bukan tambah vendor.<br />Satukan arah.</h2>
          <p>Utero bekerja sebagai mitra kreatif: memahami masalah, menentukan prioritas, lalu menggerakkan divisi yang tepat dalam satu sistem kerja.</p>
        </div>
        <div className="impact-capability-grid">
          {capabilities.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>)}
        </div>
      </section>

      <section className="impact-offer">
        <div className="impact-offer-card">
          <div><span className="impact-section-label">Langkah pertama</span><h2>Konsultasi Arah Brand Gratis</h2><p>Tidak perlu brief sempurna. Ceritakan kondisi bisnis, tantangan, dan target Anda. Tim Utero membantu menemukan titik mulai yang paling relevan.</p></div>
          <ul><li><Check aria-hidden="true" /> Pemetaan masalah utama</li><li><Check aria-hidden="true" /> Identifikasi prioritas komunikasi</li><li><Check aria-hidden="true" /> Rekomendasi langkah awal</li></ul>
          <CampaignCta placement="offer" label="Mulai Percakapan" />
        </div>
      </section>

      <section className="impact-process" id="cara-kerja" aria-labelledby="process-title">
        <div className="impact-process-head"><div><span className="impact-section-label">Cara kerja</span><h2 id="process-title">Jelas sejak awal.<br />Terukur setelah jalan.</h2></div></div>
        <div className="impact-step-grid">
          {steps.map((step, index) => <article key={step.number}><span>{step.number}</span>{index === 0 ? <Target aria-hidden="true" /> : index === 1 ? <Layers3 aria-hidden="true" /> : <Zap aria-hidden="true" />}<h3>{step.title}</h3><p>{step.text}</p></article>)}
        </div>
      </section>

      <section className="impact-final">
        <p>Ide Anda sudah cukup berharga untuk diwujudkan.</p><h2>Sekarang, buat<br />dampaknya nyata.</h2><CampaignCta placement="final" label="Bicara dengan Utero" />
      </section>
    </main>
  );
}
