const variables = {
    en: {
        // NavBar
        connect: 'Connect',
        connect_wallet: 'Connect Wallet',
        create: 'Create',
        disconnect: 'Disconnect',
        about: 'About',
        dashboard: 'Dashboard',
        claim_faucet: 'Claim Faucet',
        nft_collection: 'NFT Collection',
        nft_collection_info: 'create a collection of NFTs',
        asset_via_upload: 'Asset via File Upload',
        asset_via_upload_info: 'create audio, video, document NFTs by uploading files',
        faucet: 'Faucet',
        claim_test_tokens: 'Claim Test Tokens',

        // Home
        all_collections: 'All Collections',
        my_collections: 'My Collections',
        collections: 'Collections',
        nfts: 'NFTs',
        native_nfts: 'Native  NFTs',
        ibc_nfts: 'IBC NFTs',
        search: 'Search',
        bulk_mint: 'Bulk Mint',
        edit: 'Edit',
        actions: 'Actions',
        nft_id: 'NFT ID',
        nft_title: 'NFT Title',
        nft_type: 'NFT Type',
        origin_chain: 'Origin Chain',
        transfer: 'Transfer',
        burn: 'Burn',
        invalid_address: 'Invalid Address',

        create_collection: 'Create collection',
        update_collection: 'Update collection',
        create_nft: 'Create NFT',
        created_by: 'Created by',

        // Create Collection
        collection_avatar: 'Collection Avatar',
        collection_avatar_info: 'Enter an IPFS URL of the collection avatar image or Upload from local directory',
        visual: 'Visual',
        code: 'Code',
        add_property: 'Add Property',
        enter_property_name: 'Enter Property Name',
        select_property_type: 'Select Property Type',
        required: 'Required',
        list_nft_confirmation: 'List NFT Confirmation',
        message_type: 'Message Type',
        listed_type: 'Listed Type',
        confirm_listing: 'Confirm Listing',
        confirm_auction: 'Confirm Auction',
        mint_collection_confirmation: 'Mint Collection Confirmation',
        update_collection_confirmation: 'Update Collection Confirmation',
        schema_property: 'Schema Properties',
        collection_name: 'COLLECTION NAME',
        collection_name_info: 'Enter your collection name.',
        collection_symbol: 'COLLECTION SYMBOL',
        collection_symbol_info: 'Enter collection or denom Symbol. This will act as denom symbol.(min 3 characters)',
        nft_properties: 'NFT Properties',
        nft_properties_info: 'Enter NFT property values under this collection.',
        mint_collection: 'Mint Collection',
        collection_placeholder_description: 'Enter collection description over here',
        collection_json_schema: 'Enter your schema in JSON format',
        collection_description: 'Collection description',
        json_schema_properties: 'Schema Properties',
        json_schema_properties_info: 'Add Custom Schema, Upload Schema via JSON File or Choose from pre-defined schema templates. For Visual Editor, schemas with array properties can go upto one level only. Use code editor if you want to add more under  nested schema properties.',
        json_schema: 'JSON Schema',
        json_schema_info: 'Denom represents a denomination for a collection of NFTs',
        max_characters: '(Max:240 characters)',
        image_url_placeholder: 'Enter image URL for Collection Avatar',
        collection_image_url: 'Image URL for collection avatar',
        required_field: '[required fields*]',
        upload_schema_json_file: 'Upload Schema via JSON File',
        collection: 'Collection',
        collection_info: 'Gives information about a specific collection',
        nft_avatar: 'NFT Image',
        nft_avatar_placeholder: 'Enter image URL',
        nft_avatar_info: 'Upload Album Art (1440x1440). Optional, but we recommend so that your audio stands out from the rest',
        file_url: 'File URL',
        upload_file: 'Upload File',
        re_upload_file: 'Re-Upload File',
        upload_file_error: 'File should not be empty',
        upload_file_info: 'Drag ‘n’ Drop or Select file to upload',
        drag_and_drop: 'Drag and Drop Files over here',
        browse_files: 'Browse Files',
        uploading_files: 'Uploading files',
        uploaded_files: 'Uploaded files',
        create_new_collection: 'Create New Collection',
        enter_collection_name: 'Enter Collection Name',
        enter_collection_symbol: 'Enter Collection Symbol',
        cancel: 'Cancel',
        confirm: 'Confirm',
        approval_pending: 'APPROVAL PENDING',
        view: 'View',

        transfer_header: 'Transfer your NFT to a supported network',
        enter_your: 'Enter your ',
        account_address: ' account address',
        ibc_native_transfer: 'IBC Native Transfer',
        ibc_transfer: 'IBC Transfer',
        native_transfer: 'Native Transfer',
        transfer_success: 'IBC Transfer fo your NFT is now successful',
        tx_hash: 'Transaction Hash',
        yay: 'Yay!',
        transfer_failed: 'IBC Transfer not successful',
        agree_to_delete: 'Do you agree to delete the NFT?',
        enter_last_digit: 'Enter last 4 characters of the NFT ID',
        burn_nft: 'Burn NFT',
        nft_deleted: 'NFT deleted',
        burn_failed: 'Burn not successful',
        okay: 'Okay',

        // mint NFT
        select_collection: '-- Select collection --',
        upload_assets: 'Upload Assets',
        enter_asset_title: 'Enter Asset Title',
        asset_title_error: 'Asset Title should not be empty',
        enter_description: 'Enter description',
        description_error: 'Description size should not exceed 256 characters',
        enter_royalty_share: 'Enter Royalty Share',
        add_addresses: 'Add Addresses',
        invalid: 'Invalid',
        suffix: 'Suffix',
        suffix_info: 'Your NFT titles will look like ',
        nft_description: 'NFT Description',
        nft_media_url: 'NFT Media URL',
        preview_url: 'Preview URL',
        schema_properties: 'Schema Properties for Collection',
        schema_properties_info: 'Enter NFT property values under this collection.',
        transfer_status: 'Transferability',
        transfer_status_info1: 'Non-transferable NFTs can NOT be transferred or traded. Transferable are tradable.',
        extensible: 'Extensible',
        extensible_info1: 'extensibility allows you to license your NFTs in the future',
        nsfw_name: 'NSFW',
        nsfw_info1: 'Not Safe for Work is a flag to indicate inappropriate content.',
        royalties: 'Royalties',
        royalties_info: 'This % will be shared among creators',
        accounts: 'Accounts',
        accounts_info: 'Enter/paste accounts to mint the NFTs to. Leave blank to mint NFT to yourself.',
        mint: 'Mint',
        nft: 'NFT',
        select_suffix: 'Select Suffix',
        suffix_count: 'Suffix start count',
        suffix_count_error: 'Suffix start count should not be empty',
        enter_url: 'Enter URL',

        // mint confirmation
        mint_nft_confirmation: 'Mint NFT Confirmation',
        denom_symbol: 'Denom Symbol',
        nft_image_url: 'NFT Image URL',
        transferability: 'Transferability',
        extensibility: 'Extensibility',
        processing: 'Processing',
        confirm_mint_nft: 'Confirm Mint NFT',
        schema: 'Schema',
        nsfw: 'NSFW (not safe for work)',
        ibc: 'IBC',
        native: 'Native',

        welcome_to_gon: 'Welcome to Game of NFTs',
        welcome_gon_content: 'Game of NFTs (GoN) is an event with public incentivized testnets and a hackathon where you can test the Interchain NFTs and build your NFT applications.',
        connect_view_nfts: 'Connect to view NFTs',
        connect_view_content: 'lorem ipsum dores asd sadasdj sadad asdsad sad lipsum dores',
        create_nfts: 'Create NFTs in minutes',
        create_nfts_content: 'lorem ipsum dores asd sadasdj sadad asdsad sad lipsum dores',
        transfer_nfts: 'Transfer NFTs to other chains',
        transfer_nfts_content: 'lorem ipsum dores asd sadasdj sadad asdsad sad lipsum dores asdsada sadsadasd',
        powered_by: 'powered by',
    },
};

export default variables;
