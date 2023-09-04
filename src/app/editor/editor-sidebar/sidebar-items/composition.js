import React, { PureComponent } from 'react'
import CompositionAsset from './composition-asset'
import { getUploadURL } from 'app/lib'
import R from 'ramda'
import { Root } from './styled-sidebar-item'

class Composition extends PureComponent {
  state = {
    assets: this.getInitialAssets(this.props.node),
  }

  componentDidUpdate(prevProps) {
    const { node: prevNode } = prevProps
    const { node: nextNode } = this.props

    const prevJSONFile = prevNode.data.get('json')
    const prevJSONFileData = prevNode.data.get('jsonFile')
    const prevAssets = prevNode.data.get('assets')
    const nextJSONFile = nextNode.data.get('json')
    const nextJSONFileData = nextNode.data.get('jsonFile')
    const nextAssets = nextNode.data.get('assets')

    if (!R.equals(prevJSONFile, nextJSONFile) || !R.equals(prevJSONFileData, nextJSONFileData)) {
      this.populateAssets()
    }

    if (!R.equals(prevAssets, nextAssets)) {
      const assets = this.getInitialAssets(nextNode)
      this.setState({ assets })
    }
  }

  componentWillUnmount() {
    if (this.reader) {
      this.reader.abort()
    }
  }

  getInitialAssets(node) {
    const assetData = node.data.get('assets')

    if (!assetData) {
      return []
    }

    const assetURLs = R.pipe(
      R.pluck('fileData'),
      R.map(getUploadURL),
      R.filter(Boolean),
    )(assetData)

    const assetMeta = R.pipe(
      R.pluck('metadata'),
      R.map(metadatum => {
        return typeof metadatum === 'string' ? JSON.parse(metadatum) : metadatum
      }),
    )(assetData)

    const assets = R.zipWith(this.zipAssetURLs, assetURLs, assetMeta)

    return assetData.map((assetDatum, idx) => {
      const data = R.propOr({}, idx, assets)
      return {
        ...assetDatum,
        ...data,
      }
    })
  }

  handleClearFileInput(id) {
    const { assets } = this.state

    const idx = R.findIndex(R.where({ metadata: R.propEq('id', id) }), assets)

    const asset = R.omit(['file'], R.prop(idx, assets))
    assets.splice(idx, 1, asset)

    this.persistAssets(assets)
  }

  handleSetFileInput(id, file) {
    const { assets } = this.state

    const idx = R.findIndex(R.where({ metadata: R.propEq('id', id) }), assets)
    const asset = R.prop(idx, assets)
    asset.file = file
    assets.splice(idx, 1, asset)

    this.persistAssets(assets)
  }

  async loadJSONFile(data) {
    const url = getUploadURL(data)
    const res = await fetch(url)
    const json = await res.json()

    const assetMeta = R.map(R.omit(['p', 'u']), json.assets)
    const assetURLs = json.assets.map(asset => `${ asset.u }${ asset.p }`)

    return R.zipWith(this.zipAssetURLs, assetURLs, assetMeta)
  }

  persistAssets(assets) {
    const { node, onChange, value } = this.props

    const change = value.change()
      .setNodeByKey(node.key, {
        data: node.data.set('assets', assets),
      })
      .focus()

    onChange(change)
  }

  async populateAssets() {
    const {
      node,
    } = this.props

    const jsonFile = node.data.get('json')
    const jsonFileData = node.data.get('jsonFile')
    const initialAssets = this.getInitialAssets(node)
    let assets = []

    if (jsonFile) {
      try {
        assets = await this.readJSONFile(jsonFile)
      } catch (err) {
        throw err
      }
    } else if (jsonFileData) {
      try {
        assets = await this.loadJSONFile(jsonFileData)
      } catch (err) {
        throw err
      }
    }

    assets = assets.map(asset => {
      const idx = R.findIndex(R.where({ metadata: R.propEq('id', asset.metadata.id) }), initialAssets)
      const initialAsset = R.prop(idx, initialAssets)

      return {
        ...initialAsset,
        ...asset,
      }
    })

    this.setState({ assets })
  }

  readJSONFile(file) {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        const json = JSON.parse(reader.result)
        const metadata = R.pipe(
          R.map(R.omit(['p', 'u'])),
          R.map(m => ({ metadata: m })),
        )(json.assets)
        resolve(metadata)
      })
      reader.readAsText(file)
      this.reader = reader
    })
  }

  renderAsset({ file, url, metadata }) {
    const { id } = metadata

    return (
      <CompositionAsset
        file={ file }
        id={ id }
        key={ id }
        url={ url }
        onClearFileInput={ this.handleClearFileInput }
        onSetFileInput={ this.handleSetFileInput } />
    )
  }

  zipAssetURLs(url, metadata) {
    return {
      metadata,
      url,
    }
  }

  render() {
    const { assets } = this.state

    return (
      <Root>
        { assets.map(this.renderAsset) }
      </Root>
    )
  }
}

export default Composition
