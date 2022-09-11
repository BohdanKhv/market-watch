import { useEffect } from "react"

const ChartView = ({symbol}) => {

    useEffect(() => {
        // add widget
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.innerHTML = `
        new TradingView.widget(
            {
            "autosize": true,
            "symbol": "NASDAQ:${symbol || 'AAPL'}",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "2",
            "locale": "en",
            "toolbar_bg": "#f1f3f6",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "range": "YTD",
            "allow_symbol_change": true,
            "save_image": false,
            "container_id": "tradingview_00b9b"
            }
            );
        `;
        document.getElementById('tradingview_00b9b').appendChild(script);

    }, [])

    return (
        <div className="py-3" style={{minHeight: '400px', height: '400px'}}>
            <div class="tradingview-widget-container" style={{minHeight: '400px', height: '400px'}}>
                <div id="tradingview_00b9b" style={{minHeight: '400px', height: '400px'}}></div>
                <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">{symbol || 'AAPL'} Chart</span></a> by TradingView</div>
            </div>
        </div>
    )
}

export default ChartView