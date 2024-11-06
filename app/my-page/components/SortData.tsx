import React from 'react';

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return date.toLocaleDateString('ko-KR', options);
  };

interface Youtuber {
  thumbnails: string;
  title: string;
  publishedAt: string; // 날짜 형식에 맞게 조정할 수 있습니다.
}

interface SortDataProps {
  youtuber: Youtuber[]; // youtuber를 배열로 정의
}

const SortData: React.FC<SortDataProps> = ({ youtuber }) => {
  return (
     <div className="container">
     <div className="d-flex justify-content-between align-items-center mb-3">
       <h5>구독한 유튜버 수: {youtuber.length}</h5>
     </div>
     <div className="row">
       {youtuber.map((item, index) => (
         <div className="col-6 mb-3" key={index}>
           <div
             className="d-flex align-items-center p-3 border rounded-pill"
             style={{ backgroundColor: "#f8f9fa" }}
           >
             <div className="me-3">
               <img
                 src={item.thumbnails}
                 alt={item.title}
                 className="rounded-circle"
                 style={{ width: "80px", height: "80px" }}
               />
             </div>
             <div>
               <h6 className="mb-0">{item.title}</h6>
               <h6 className="mb-0">구독일자: {formatDate(item.publishedAt)}</h6>
             </div>
           </div>
         </div>
       ))}
     </div>
   </div>
  );
};

export default SortData;