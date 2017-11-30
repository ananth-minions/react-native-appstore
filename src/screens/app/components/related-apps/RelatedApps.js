import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { autobind } from 'core-decorators';
import Heading from 'components/heading';
import AppItemSlider from 'components/app-item-slider';
import AppItemRow from 'components/app-item-row';
import relatedApps from 'graphql/queries/relatedApps';

@relatedApps
export default class RelatedApps extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  @autobind
  renderAppItem({
    id,
    iconUrl,
    price,
    hasInAppPurchases,
    ...props
  }) {
    return (
      <AppItemRow
        {...props}
        key={id}
        id={id}
        imageUrl={iconUrl}
        action={{
          label: price ? `$${price}` : 'GET',
          subtitle: hasInAppPurchases ? 'In-App Purchases' : undefined,
          white: true,
        }}
      />
    );
  }

  render() {
    const {
      loading,
      allApps: related,
    } = this.props.data;

    if (loading || (related && related.length === 0)) {
      return null;
    }

    return (
      <View>
        <Heading action="See All">You may also like</Heading>
        <AppItemSlider itemsPerPage={2}>
          {related.map(this.renderAppItem)}
        </AppItemSlider>
      </View>
    );
  }
}