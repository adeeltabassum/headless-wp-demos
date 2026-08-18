"use client";

import { useEcommerceContent } from "../EcommerceContentProvider";
import { FeatureSplit } from "./FeatureSplit";

export function FeaturePrimary() {
  const { home } = useEcommerceContent();
  return <FeatureSplit feature={home.featurePrimary} />;
}

export function FeatureSecondary() {
  const { home } = useEcommerceContent();
  return <FeatureSplit feature={home.featureSecondary} />;
}
