import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <>
      <Helmet>
        <title>404 - Halaman Tidak Ditemukan | Utero Indonesia</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 800,
            color: 'var(--red)',
            marginBottom: '16px',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '18px',
            color: 'var(--muted)',
            marginBottom: '32px',
          }}
        >
          Halaman yang Anda cari tidak ditemukan
        </p>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            background: 'var(--red)',
            color: '#fff',
            textDecoration: 'none',
            borderRadius: '4px',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </>
  );
}
