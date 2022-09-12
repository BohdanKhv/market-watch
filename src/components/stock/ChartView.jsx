import { useEffect } from "react"
import { useSelector } from "react-redux";
import stocks from '../../assets/data/stocks.json'

const ChartView = ({symbol}) => {
    const theme = useSelector(state => state.local.theme);
    const favorite = useSelector(state => state.local.favorite).map(i => i.symbol.toLowerCase());

    useEffect(() => {
        const stock = stocks.find(i => i.symbol.toLowerCase() === symbol.toLowerCase());
        const other = stocks.filter(i => favorite.includes(i.symbol.toLowerCase()) && i.symbol.toLowerCase() !== symbol.toLowerCase());
        // add widget
        console.log(stock)
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
        script.async = true;
        script.innerHTML = `
            {
                "colorTheme": "${theme === 'dark' ? 'dark' : 'light'}",
                "dateRange": "12M",
                "showChart": true,
                "locale": "en",
                "largeChartUrl": "",
                "isTransparent": true,
                "showSymbolLogo": true,
                "showFloatingTooltip": true,
                "width": "100%",
                "height": "100%",
                "plotLineColorGrowing": "rgba(0, 255, 0, 1)",
                "plotLineColorFalling": "rgba(255, 0, 0, 1)",
                "gridLineColor": "rgba(66, 66, 66, 1)",
                "scaleFontColor": "rgba(120, 123, 134, 1)",
                "belowLineFillColorGrowing": "rgba(0, 255, 0, 0.12)",
                "belowLineFillColorFalling": "rgba(255, 0, 0, 0.12)",
                "belowLineFillColorGrowingBottom": "rgba(217, 234, 211, 0)",
                "belowLineFillColorFallingBottom": "rgba(234, 153, 153, 0)",
                "symbolActiveColor": "rgba(152, 152, 152, 0)",
                "tabs": [
                {
                    "title": "Indices",
                    "symbols": [
                    {
                        "s": "${stock.exchange}:${stock.symbol}",
                        "d": "${stock.name}"
                    },
                    ${other.map(i => `{
                        "s": "${i.exchange}:${i.symbol}",
                        "d": "${i.name}"
                    }`).join(',')}
                    ],
                    "originalTitle": "Indices"
                }
            ]
        }
        `;
        document.querySelector('.trandingview-widget').appendChild(script);

    }, [])

    return (
        <div className="pt-3 pb-5 mb-5" style={{minHeight: '400px', height: '400px', height: '600px'}}>
            <div className="tradingview-widget-container" style={{minHeight: '400px', height: '400px', height: '600px'}}>
                <div className="tradingview-widget-container__widget"></div>
                <div className="trandingview-widget" style={{minHeight: '400px', height: '400px', height: '600px'}}/>
                <div className="tradingview-widget-copyright pt-3">
                    <a href="https://www.tradingview.com/markets/" rel="noopener" target="_blank"><span className="blue-text">Financial Markets</span></a> by TradingView
                </div>
        </div>
    </div>
    )
}

export default ChartView