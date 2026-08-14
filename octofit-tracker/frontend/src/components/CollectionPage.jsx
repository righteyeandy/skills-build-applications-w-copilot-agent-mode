import { useEffect, useMemo, useState } from 'react';
import { fetchCollection } from './apiClient';

function formatValue(value) {
  if (value === null || value === undefined) {
    return 'N/A';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    if (typeof value[0] === 'object') {
      return JSON.stringify(value.map((item) => item?.name || item?._id || item), null, 0);
    }

    return value.join(', ');
  }

  if (typeof value === 'object') {
    return value.name || value.title || value.email || value._id || JSON.stringify(value);
  }

  return String(value);
}

function CollectionPage({ endpoint, title, subtitle, columns }) {
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError('');

      try {
        const result = await fetchCollection(endpoint);

        if (!active) {
          return;
        }

        setRows(result.rows);
        setMeta(result.raw);
      } catch (loadError) {
        if (active) {
          setError(loadError.message || 'Unable to load data.');
          setRows([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [endpoint]);

  const total = useMemo(() => {
    if (typeof meta?.count === 'number') {
      return meta.count;
    }

    if (typeof meta?.total === 'number') {
      return meta.total;
    }

    if (typeof meta?.totalDocs === 'number') {
      return meta.totalDocs;
    }

    return rows.length;
  }, [meta, rows.length]);

  return (
    <section className="container py-4">
      <header className="mb-4">
        <h1 className="h3 mb-1">{title}</h1>
        <p className="text-secondary mb-0">{subtitle}</p>
      </header>

      {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}

      {!loading && error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <>
          <p className="small text-secondary">
            Showing {rows.length} of {total} records
          </p>
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="text-center py-4">
                      No records found.
                    </td>
                  </tr>
                )}
                {rows.map((row, index) => (
                  <tr key={row._id || `${endpoint}-${index}`}>
                    {columns.map((column) => (
                      <td key={column.key}>{formatValue(row[column.key])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

export default CollectionPage;
