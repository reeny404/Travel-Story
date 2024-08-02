function FooterList() {
  const lineStyle = "mb-3 cursor-pointer";
  return (
    <section className="w-full">
      <p className={lineStyle}>고객센터</p>
      <p className={lineStyle}>이용약관</p>
      <p className={lineStyle}>개인정보처리방침</p>
      <p className={lineStyle}>사용 가이드</p>
      <p className={lineStyle}>로그아웃</p>
    </section>
  );
}

export default FooterList;
