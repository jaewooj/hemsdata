import './Footer.css'

const Footer = () => {
    return (
        <footer id="footer">
            <div className="inner">
                <div className="logoDiv">
                    <p>신재생에너지전문기업</p>
                    <img src="/images/jhLogo.png" alt="" />
                </div>
                <div className="copCon">
                    <div className="first">
                        <p>주식회사 제이에이치에너지</p>
                        <p>주소: 인천광역시 서구 북항로 120번길 13-26(원창동)</p>
                        <p>대표: 유정희</p>
                    </div>
                    <div className="sec">
                        <p>Tel: 032-573-5570</p>
                        <p>Fax: 032-573-5571</p>
                        <p>E-Mail: jh-e@jh-e.co.kr</p>
                    </div>
                    <div className="third">
                        <p>사업자등록번호:121-81-25326</p>
                        <p>Copyright jh-energy Corp. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;