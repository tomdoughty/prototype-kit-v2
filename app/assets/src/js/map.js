import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import Vector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { fromLonLat } from 'ol/proj';

export default () => {
  const center = [
    window.NHSUK_SETTINGS.USER_LONGITUDE,
    window.NHSUK_SETTINGS.USER_LATITUDE,
  ];

  const createMarker = (lonLat, home = false) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(lonLat)),
    });

    const src = home ? 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Home_Icon.svg' : '/images/favicons/apple-touch-icon-180x180.png';
    const scale = home ? 0.05 : 0.2;

    feature.setStyle(
      new Style({
        image: new Icon({
          color: '#ffffff',
          crossOrigin: 'anonymous',
          scale,
          src,
        }),
      })
    );

    return feature;
  };

  (() => new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: new Vector({
          features: [
            createMarker(center, true),
            ...window.NHSUK_SETTINGS.TEST_CENTRE_COORDINATES
              .map((lonLat) => createMarker(lonLat)),
          ],
        }),
      }),
    ],
    target: 'map',
    view: new View({
      center: fromLonLat(center),
      zoom: 10,
    }),
  }))();
};
