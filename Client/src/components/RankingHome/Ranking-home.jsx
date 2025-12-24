import rank_1 from '../../assets/rank-1.avif';
import rank_2 from '../../assets/rank-2.avif';
import rank_3 from '../../assets/rank-3.png';
import rank_4 from '../../assets/rank-4.png';
import rank_5 from '../../assets/rank-5.avif';
import rank_6 from '../../assets/rank-6.png';
import './ranking-home.css';

const HalftoneBackground = ({
    gradient,
    dotColor = 'rgba(0, 0, 0, 0.2)',
    dotSpacing = 10,
    dotOpacity = 0.6,
    className = '',
    children
}) => {
    const containerStyle = {
        background: gradient,
        position: 'relative',
        overflow: 'hidden'
    };

    const dotsStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(circle, ${dotColor} 1px, transparent 1px)`,
        backgroundSize: `${dotSpacing}px ${dotSpacing}px`,
        opacity: dotOpacity,
        pointerEvents: 'none',
        zIndex: 1
    };

    const contentStyle = {
        // position: 'relative',
        zIndex: 2
    };

    return (
        <div style={containerStyle} className={className}>
            <div style={dotsStyle} />
            <div style={contentStyle}>
                {children}
            </div>
        </div>
    );
};

const HALFTONE_PRESETS = {
    orange: `
    radial-gradient(circle at 30% 50%, rgba(255, 140, 0, 0.5) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(255, 100, 0, 0.4) 0%, transparent 50%),
    linear-gradient(135deg, #ff6600ff 0%, #ff8800b4 50%, #ffaa00 100%)
  `,
    blue: `
    radial-gradient(circle at 30% 50%, rgba(0, 102, 255, 0.28) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(0, 200, 255, 0.62) 0%, transparent 50%),
    linear-gradient(135deg, #0040ffe4 0%, #0080ffd4 50%, #00a2ffef 100%)
  `,
    darkOrange: `
    radial-gradient(circle at 30% 50%, rgba(200, 80, 0, 0.5) 0%, transparent 50%),
    radial-gradient(circle at 70% 50%, rgba(150, 50, 0, 0.4) 0%, transparent 50%),
    linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #CD853F 100%)
  `
};

export default function Ranking() {
    return (
        <div className="ranking-cont">
            <div className="ranking">
                <div className="ranking-head">
                    <h2>Player Rankings</h2>
                    <div className="">Updated on 20/10/2025</div>
                </div>
                <div className="ranking-list-cont">
                    <div className="ranking-list">

                        <HalftoneBackground
                            gradient={HALFTONE_PRESETS.orange}
                            dotColor="rgba(0, 0, 0, 0.2)"
                            dotSpacing={10}
                            className="ranking-card"
                        >
                            <div className="ranking-info">
                                <img src={rank_1} alt="" />
                                <div className="ranking-position">
                                    1<sup>ST</sup>
                                </div>
                                <div className="ranking-player">
                                    <div className="player-name">
                                        <h3>
                                            <span className='player-name-first'>DANIYAL</span>
                                            <span className='player-name-last'>ASIF</span>
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="ranking-points">421 <small>PTS</small> </div>
                        </HalftoneBackground>

                        <HalftoneBackground
                            gradient={HALFTONE_PRESETS.blue}
                            dotColor="rgba(255, 255, 255, 0.15)"
                            dotSpacing={8}
                            dotOpacity={0.7}
                            className="ranking-card"
                        >
                            <div className="ranking-info">
                                <img src={rank_2} alt="" />
                                <div className="ranking-position">
                                    2<sup>ND</sup>
                                </div>
                                <div className="ranking-player">
                                    <div className="player-name"><h3>
                                        <span className='player-name-first'>DANIYAL</span>
                                        <span className='player-name-last'>ASIF</span>
                                    </h3></div>
                                </div>
                            </div>
                            <div className="ranking-points">421 <small>PTS</small> </div>
                        </HalftoneBackground>

                        <HalftoneBackground
                            gradient={HALFTONE_PRESETS.darkOrange}
                            dotColor="rgba(0, 0, 0, 0.25)"
                            dotSpacing={9}
                            className="ranking-card"
                        >
                            <div className="ranking-info">
                                <img src={rank_3} alt="" />
                                <div className="ranking-position">
                                    3<sup>RD</sup>
                                </div>
                                <div className="ranking-player">
                                    <div className="player-name"><h3>
                                        <span className='player-name-first'>DANIYAL</span>
                                        <span className='player-name-last'>ASIF</span>
                                    </h3></div>
                                </div>
                            </div>
                            <div className="ranking-points">421 <small>PTS</small> </div>
                        </HalftoneBackground>

                    </div>
                    <div className="ranking-list">

                        <HalftoneBackground
                            gradient={HALFTONE_PRESETS.orange}
                            dotColor="rgba(0, 0, 0, 0.2)"
                            dotSpacing={10}
                            className="ranking-card"
                        >
                            <div className="ranking-info">
                                <img src={rank_4} alt="" />
                                <div className="ranking-position">
                                    1<sup>ST</sup>
                                </div>
                                <div className="ranking-player">
                                    <div className="player-name"><h3>
                                        <span className='player-name-first'>DANIYAL</span>
                                        <span className='player-name-last'>ASIF</span>
                                    </h3></div>
                                </div>
                            </div>
                            <div className="ranking-points">421 <small>PTS</small> </div>
                        </HalftoneBackground>

                        <HalftoneBackground
                            gradient={HALFTONE_PRESETS.blue}
                            dotColor="rgba(255, 255, 255, 0.15)"
                            dotSpacing={8}
                            dotOpacity={0.7}
                            className="ranking-card"
                        >
                            <div className="ranking-info">
                                <img src={rank_5} alt="" />
                                <div className="ranking-position">
                                    2<sup>ND</sup>
                                </div>
                                <div className="ranking-player">
                                    <div className="player-name"><h3>
                                        <span className='player-name-first'>DANIYAL</span>
                                        <span className='player-name-last'>ASIF</span>
                                    </h3></div>
                                </div>
                            </div>
                            <div className="ranking-points">421 <small>PTS</small> </div>
                        </HalftoneBackground>

                        <HalftoneBackground
                            gradient={HALFTONE_PRESETS.darkOrange}
                            dotColor="rgba(0, 0, 0, 0.25)"
                            dotSpacing={9}
                            className="ranking-card"
                        >
                            <div className="ranking-info">
                                <img src={rank_6} alt="" />
                                <div className="ranking-position">
                                    3<sup>RD</sup>
                                </div>
                                <div className="ranking-player">
                                    <div className="player-name"><h3>
                                        <span className='player-name-first'>DANIYAL</span>
                                        <span className='player-name-last'>ASIF</span>
                                    </h3></div>
                                </div>
                            </div>
                            <div className="ranking-points">421 <small>PTS</small> </div>
                        </HalftoneBackground>

                    </div>
                </div>
                <div className="view-all-rankings">
                   <a href="/rankings">View All</a> 
                </div>
            </div>
        </div>
    );
}

export { HalftoneBackground, HALFTONE_PRESETS };