import React, { useState, useEffect } from "react";
import { fetchSocialLinks } from "../../http/socialAPI";
import { observer } from "mobx-react-lite";
import "./SocialList.scss";

const SocialList = observer(() => {
  const [socialLinks, setSocialLinks] = useState([]);
  const desiredPlatforms = ["facebook", "instagram", "twitter", "youtube"]; // Здесь указываются названия нужных платформ

  useEffect(() => {
    fetchSocialLinks().then((data) => {
      setSocialLinks(data);
    });
  }, []);

  const filteredSocialLinks = socialLinks.filter((link) =>
    desiredPlatforms.includes(link.platform)
  );

  return (
    <div className="social-link">
      <ul className="social-link__list list-reset">
        {filteredSocialLinks.map((link) => (
          <li className="social-link__item" key={link.id}>
            <a
              href={link.url}
              className="social-link__link"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={`../images/${link.platform}.svg`}
                alt={link.platform}
                className="social-link__icon"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default SocialList;
