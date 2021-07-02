import React from 'react';
import { Form } from 'antd';

import { connect } from "react-redux";
// import FormPengajuanProyek from '../forms/Form-Pengajuan-Proyek';

const mapStateToProps = store => {
    return {
        itemPersetujuanSelected: store.master.item_proyek_selected,
    };
};

class PengajuanBaru extends React.Component {
    constructor(props) {
		super(props);

        this.state = {
            mode: "add"
        }
        
    }

    componentDidMount() {
        this.setState({mode: this.props.mode});
    }

    render() {
        const { itemPersetujuanSelected } = this.props;
        const { mode } = this.state;

        let keyForm;
        let initEdit;
        if(mode === 'edit' && itemPersetujuanSelected !== null ) {
        }
        else {
            initEdit = {
                layout: 'vertical',
                remember: true,
                ["tanggal"]: moment()
            };

            keyForm = 'add';
        }

        let page = 
        <Form
            name="form-persiapan-proyek"
            onFinish={this.handleOnFinish}
            ref={this.formRef}
            layout='vertical'
            initialValues={initEdit}
            key={keyForm}
        >

        </Form>;

        return(page);
    }
}

export default connect(mapStateToProps, null)(PengajuanBaru);