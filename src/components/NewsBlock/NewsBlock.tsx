import React, { useState } from "react";
import { Card, Button, Avatar } from "antd";
import "./NewsBlock.css";

interface Keyword {
  value: string;
  count: number;
}

interface Traffic {
  value: string;
  count: number;
}

interface NewsCardProps {
  data: {
    ID: number;
    TI: string;
    AB: string;
    URL: string;
    DOM: string;
    DP: string;
    LANG: string;
    REACH: number;
    KW: Keyword[];
    AU: string[];
    CNTR: string;
    CNTR_CODE: string;
    SENT: string;
    TRAFFIC: Traffic[];
    FAV: string;
    HIGHLIGHTS: string[];
  };
}

const NewsBlock: React.FC<NewsCardProps> = ({ data }) => {
  const [showAllHighlights, setShowAllHighlights] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString("en-GB", { month: "short" });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const formatReach = (reach: number) => {
    if (reach >= 1000000) {
      const value = (reach / 1000000).toFixed(1);
      return { value, suffix: "M" };
    }
    if (reach >= 1000) {
      const value = (reach / 1000).toFixed(0);
      return { value, suffix: "K" };
    }
    return { value: reach.toString(), suffix: "" };
  };

  const topTraffic = data.TRAFFIC.slice(0, 3).map((item) => ({
    country: item.value,
    percent: Math.round(item.count * 100),
  }));

  return (
    <Card className="news-card">
      <div className="news-header">
        <div className="news-meta">
          <span className="news-date">
            <span className="date-day">{formatDate(data.DP).day}</span>{" "}
            <span className="date-rest">
              {formatDate(data.DP).month} {formatDate(data.DP).year}
            </span>
          </span>
          <span className="news-reach">
            <span className="reach-value">
              {formatReach(data.REACH).value}
              {formatReach(data.REACH).suffix}
            </span>{" "}
            <span className="reach-text">Reach</span>
          </span>
          {topTraffic.length > 0 && (
            <span className="news-traffic">
              <span className="traffic-text">Top Traffic: </span>
              {topTraffic.map((item, index) => (
                <span key={index} className="traffic-item">
                  <span className="traffic-country">{item.country}</span>{" "}
                  <span className="traffic-percent">{item.percent}%</span>
                </span>
              ))}
            </span>
          )}
        </div>
        <div className="sentiment-indicator">{data.SENT}</div>
      </div>

      <h3 className="news-title">{data.TI}</h3>

      <div className="news-source">
        <div className="source-left">
          {data.FAV && (
            <Avatar src={data.FAV} size="small" className="source-icon" />
          )}
          <a
            href={data.URL}
            target="_blank"
            rel="noopener noreferrer"
            className="domain-link"
          >
            {data.DOM}
          </a>
          <span className="country">{data.CNTR}</span>
          <span className="language">{data.LANG}</span>
          <span className="news-id">ID: {data.ID}</span>
        </div>
      </div>

      {data.AU.length > 0 && (
        <div className="news-authors">
          {data.AU.join(", ")} {data.AU.length > 2 ? "et al." : ""}
        </div>
      )}

      <div className="news-highlights">
        {showAllHighlights ? (
          <p
            dangerouslySetInnerHTML={{
              __html: `Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones
August 2020 by <kw>Kaspersky</kw>
<kw>New</kw> research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by <kw>Kaspersky</kw>, nearly half (47%) of smartphone owners who use a banking app don't protect their mobile device with <kw>antivirus</kw> or security sofsoftware. More than half (52%) of UK smartphone owners who access bank accounts with their mobile device are worried about their banking app being hacked if their phone was lost or stolen. Despite that fear, 47%[2] are banking on devices without <kw>antivirus</kw> hone with <kw>antivirus</kw> protection. Surprisingly, one fifth (21%) of adults overall, and one third (33%) of Generation Z, believe their phone can't be hacked, despite the level of mobile malware attacks rising over the past 12 months. Around two-in-five of those without <kw>antivirus</kw> and s…`,
            }}
          />
        ) : (
          <p
            dangerouslySetInnerHTML={{
              __html: `Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones
August 2020 by <kw>Kaspersky</kw>
<kw>New</kw> research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by <kw>Kaspersky</kw>...`,
            }}
          />
        )}
        <Button
          type="link"
          className="show-more"
          onClick={() => setShowAllHighlights(!showAllHighlights)}
        >
          {showAllHighlights ? "Show less" : "Show more"}{" "}
          <span className="triangle">{showAllHighlights ? "▲" : "▼"}</span>
        </Button>
      </div>

      <div className="news-keywords">
        {[
          { value: "Kaspersky", count: 2 },
          { value: "New", count: 1 },
          { value: "antivirus", count: 4 },
        ].map((kw, index) => (
          <span key={index} className="news-keyword">
            <span className="kw">
              {kw.value} <span className="count">{kw.count}</span>
            </span>
          </span>
        ))}
        {data.KW.length > 3 && (
          <Button type="link" className="show-all">
            Show All +{data.KW.length - 3}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default NewsBlock;
