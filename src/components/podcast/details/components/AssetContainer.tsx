import React from "react";
import { Collection } from "../../../models/podcast";
import path from "path";
import DescriptionIcon from "@material-ui/icons/Description";
import {
  Card,
  Typography,
  GridList,
  GridListTile,
  GridListTileBar,
  Divider,
  useMediaQuery,
  useTheme,
  CardMedia,
} from "@material-ui/core";
import {
  LazyLoadImage,
  LazyLoadComponent,
} from "react-lazy-load-image-component";

export default function AssetContainer(props: { collections: Collection[] }) {
  const { collections } = props;
  const theme = useTheme();
  const mdMatches = useMediaQuery(theme.breakpoints.down("md"));
  const smMatches = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <div style={{ width: "100%" }}>
      {collections.map((c, i) => (
        <Card key={`collection-${i}`} style={{ padding: 20, marginBottom: 20 }}>
          <Typography variant="h6">{c.title}</Typography>
          <Typography>{c.description}</Typography>
          <Divider style={{ width: "100%", marginBottom: 10 }} />
          <GridList
            cellHeight={200}
            cols={mdMatches ? (smMatches ? 2 : 4) : 6}
            spacing={10}
          >
            {c.assets.map((a, i) => (
              <GridListTile
                key={`asset-${i}`}
                onClick={() => {
                  window.open(a.src);
                }}
                style={{ cursor: "grab" }}
              >
                {a.cover || a.type === "image" ? (
                  <LazyLoadComponent>
                    <CardMedia
                      image={a.cover ?? a.src}
                      style={{ height: 200, width: "100%" }}
                    />
                  </LazyLoadComponent>
                ) : (
                  <DescriptionIcon style={{ width: "100%", height: 160 }} />
                )}
                <GridListTileBar
                  title={decodeURIComponent(path.basename(a.src))}
                  subtitle={a.type}
                />
              </GridListTile>
            ))}
          </GridList>
        </Card>
      ))}
    </div>
  );
}
