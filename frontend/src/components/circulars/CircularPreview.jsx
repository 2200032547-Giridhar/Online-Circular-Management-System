import React from 'react';

const CircularPreview = ({ circular }) => {
  if (!circular) {
    return <div>No circular selected.</div>;
  }

  return (
    <div className="card p-3">
      <h4>{circular.title}</h4>
      <p><strong>Type:</strong> {circular.type}</p>
      <p><strong>Department:</strong> {circular.department}</p>
      <p><strong>Target Audience:</strong> {circular.targetAudience.join(', ')}</p>
      <p><strong>Status:</strong> {circular.status || 'N/A'}</p>
      <p><strong>Issue Date:</strong> {new Date(circular.issueDate).toLocaleDateString()}</p>
      {circular.receiveDate && (
        <p><strong>Receive Date:</strong> {new Date(circular.receiveDate).toLocaleDateString()}</p>
      )}
      {circular.referenceId && (
        <p><strong>Reference ID:</strong> {circular.referenceId}</p>
      )}
      {circular.attachmentUrl ? (
        <p>
          <strong>Attachment:</strong>{' '}
          <a
            href={`http://localhost:5000/${circular.attachmentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View PDF
          </a>
        </p>
      ) : (
        <p><em>No attachment available</em></p>
      )}
    </div>
  );
};

export default CircularPreview;
