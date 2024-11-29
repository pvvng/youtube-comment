export default function PopularCardSkeleton() {
    return (
        <div className="skeleton">
            <div className="skeleton-title skeleton-placeholder m-auto mb-3" style={{ width: '40%' }} />
            <div className="skeleton-title skeleton-placeholder m-auto mb-3" style={{ width: '80%' }} />
            <div
                className="skeleton-thumbnail skeleton-placeholder"
                style={{
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    margin: '0 auto',
                }}
            />
            <div
                className="skeleton-box skeleton-placeholder"
                style={{
                    width: '360px',
                    height: '24px',
                    margin: '20px auto',
                    borderRadius: '8px',
                }}
            />
            <div
                className="skeleton-button skeleton-placeholder mt-4 rounded"
                style={{
                    width: '120px',
                    height: '60px',
                    margin: '0 auto',
                }}
            />
        </div>
    )
}