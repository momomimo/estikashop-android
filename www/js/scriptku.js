$(document).ready(function () {

    // // HOME
    // $("#profil-pengguna").append(`
    // <span class="name">` + nama + `</span> 
    // <span class = "role" > ` + role + ` </span>
    //             `);
    // $("#foto-pengguna").append(`
    // <img src="http://www.momomimo.id/desakita/assets/fp/penduduk/` + foto + `" alt="` + nama + `" class="img-circle" data-lock-picture="http://www.momomimo.id/desakita/assets/fp/penduduk/` + foto + `">
    //                         `);

    // // END HOME

    // DATA KELUARGA
    var base_url = "http://estika.xyz/estikashop/";
    tampiltabeldata();

    function tampiltabeldata() {
        $.ajax({
            url: "http://estika.xyz/estikashop-server/api/produk",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                var no = 1;

                $.each(data['data'], function (i, field) {
                    var id = field.kode_produk;
                    var gambar = field.gambar;
                    var nama_produk = field.nama_produk;
                    var unit = field.unit;
                    var nama_kategori = field.nama_kategori;
                    var harga = field.harga;
                    $("#tb-produk").append(`
                                            <tr>
													<td class="text-center">` + no++ + `</td>
													<td class="text-center">
														<img src="` + base_url + `assets/img/produk/` + gambar + `"
															width="50" height="50" class="image-grid-cover" alt="">
													</td>
													<td class="text-center">
														<a id="` + id + `"
															class="btn btn-secondary btn-sm btn-edit"><i
																class="fa fa-pen"></i></a>
														<a id="` + id + `"
															class="btn btn-danger btn-sm btn-hapus"><i
																class="fa fa-times"></i></a>
													</td>
													<td class="text-left">` + nama_produk + `</td>
													<td class="text-center">` + unit + `</td>
													<td class="text-center">` + harga + `</td>
													<td class="text-center">` + nama_kategori + `</td>
												</tr>
                    `);

                });
            }
        });

    }
    $("#btn-tambah").click(function () {
        $.ajax({
            url: "http://estika.xyz/estikashop-server/api/produk",
            type: "POST",
            data: $("#form-tambah").serialize(),
            dataType: "JSON",
            success: function (result) {
                if (result.status) {
                    alert("Sukses, Data berhasil ditambahkan");
                    window.location.href =
                        "produk.html";
                } else {
                    alert("Error, Data Gagal ditambahkan");
                }
            },
            error: function (xhr, Status, err) {
                $("Data Kurang Lengkap : " + Status);
            }
        });
        return false;
    });
    tampiltabelmember();

    function tampiltabelmember() {
        $.ajax({
            url: "http://estika.xyz/estikashop-server/api/member",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                var no = 1;

                $.each(data['data'], function (i, field) {
                    var id = field.id;
                    var nama = field.nama;
                    var email = field.email;
                    var alamat = field.alamat;
                    var telp = field.telp;
                    $("#tb-member").append(`
                   
                        <tr>
                            <td class="text-center">` + no++ + `</td>
                            <td class="text-left">` + nama + `</td>
                            <td class="text-center">` + alamat + `</td>
                            <td class="text-center">` + email + `</td>
                            <td class="text-center">` + telp + `</td>
                        </tr>
                    
                    `);

                });
            }
        });

    }
    tampiltabeltransaksi();

    function tampiltabeltransaksi() {
        $.ajax({
            url: "http://estika.xyz/estikashop-server/api/transaksi",
            type: "GET",
            dataType: "JSON",
            success: function (data) {
                var no = 1;
                console.log(data);

                $.each(data['data'], function (i, field) {
                    var id = field.id;
                    var nama = field.nama;
                    var nama_produk = field.nama_produk;
                    var qty = field.qty;
                    var harga = field.harga;
                    var total = harga * qty;
                    var status = field.status;

                    if (status == 0) {
                        var ket = `Belum Lunas`;
                    } else if (status == 1) {
                        var ket = `Lunas`;
                    } else if (status == 2) {
                        var ket = `Pengiriman`;
                    } else if (status == 3) {
                        var ket = `Pesanan Selesai/Sampai`;
                    }
                    $("#tb-transaksi").append(`
                        <tr>
                            <td class="text-center">` + no++ + `</td>
                            <td class="text-center">
                                <a data-toggle="modal" class="btn btn-secondary btn-sm"><i class="fa fa-pencil-square"></i></a>
                            </td>
                            <td class="text-left">` + nama + `</td>
                            <td class="text-center">` + nama_produk + `</td>
                            <td class="text-center">` + qty + `</td>
                            <td class="text-center">` + harga + `</td>
                            <td class="text-center">` + total + `</td>
                            <td class="text-center">
                               ` + ket + `
                            </td>
                        </tr>
                    `);

                });
            }
        });
    }
    // END DATA KELUARGA


    // // DATA DETAIL KELUARGA

    // tampiltabeldetail();

    // function tampiltabeldetail() {
    //     $.ajax({
    //         url: "http://www.momomimo.id/desakita-server/detailkeluarga",
    //         type: "GET",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             var no = 1;
    //             $.each(data['data'], function (i, field) {
    //                 var namalengkap1 = field.nama;
    //                 var nik1 = field.nik;
    //                 var sex1 = field.sex;
    //                 var tempatlahir1 = field.tempatlahir;
    //                 var tanggallahir1 = field.tanggallahir;
    //                 var agama1 = field.agama;
    //                 var pendidikan1 = field.pendidikan;
    //                 var pekerjaan1 = field.pekerjaan;
    //                 var goldar1 = field.gol_darah;
    //                 var idp = field.id;
    //                 var hubungan1 = field.hubungan;
    //                 var foto1 = field.foto;
    //                 var kawin1 = field.kawin;
    //                 var kewarganegaraan1 = field.kewarganegaraan;
    //                 $("#detailkeluarga").append(`
    //                 <div class="panel-group panel" id="accordion">
    //                 <div class="panel panel-accordion">
    //                                         <div class="panel-heading">
    //                                             <h4 class="panel-title">
    //                                                 <a class="accordion-toggle" data-toggle="collapse"
    //                                                     data-parent="#accordion" href="#collapse` + idp + `">
    //                                                     ` + namalengkap1 + ` | ` + hubungan1 + `
    //                                                 </a>
    //                                             </h4>
    //                                         </div>
    //                                         <div id="collapse` + idp + `" class="accordion-body collapse">
    //                                             <div class="panel-body">
    //                                                 <div class="col-md-2">
    //                                                     <center><img
    //                                                             src="http://www.momomimo.id/desakita/assets/fp/penduduk/` + foto1 + `"
    //                                                             width="90%"></center><br>
    //                                                 </div>
    //                                                 <div class="col-md-5">
    //                                                     <div class="table-responsive">
    //                                                         <table class="table mb-none">
    //                                                             <tr>
    //                                                                 <th>NIK :</th>
    //                                                                 <td>` + nik1 + `</td>
    //                                                             </tr>
    //                                                             <tr>
    //                                                                 <th>Nama :</th>
    //                                                                 <td>` + namalengkap1 + `</td>
    //                                                             </tr>
    //                                                             <tr>
    //                                                                 <th>Tempat/Tgl Lahir :</th>
    //                                                                 <td>` + tempatlahir1 + `,
    //                                                                     ` + tanggallahir1 + `</td>
    //                                                             </tr>
    //                                                             <tr>
    //                                                                 <th>Jenis Kelamin :</th>
    //                                                                 <td>` + sex1 + `</td>
    //                                                             </tr>
    //                                                             <th></th>
    //                                                             <td></td>
    //                                                         </table>
    //                                                     </div>
    //                                                 </div>
    //                                                 <div class="col-md-5">
    //                                                     <div class="table-responsive">
    //                                                         <table class="table mb-none">
    //                                                             <tr>
    //                                                                 <th>Agama :</th>
    //                                                                 <td>` + agama1 + `</td>
    //                                                             </tr>
    //                                                             <tr>
    //                                                                 <th>Status Perkawinan :</th>
    //                                                                 <td>` + kawin1 + `</td>
    //                                                             </tr>
    //                                                             <tr>
    //                                                                 <th>Pekerjaan :</th>
    //                                                                 <td>` + pekerjaan1 + `</td>
    //                                                             </tr>
    //                                                             <tr>
    //                                                                 <th>Kewarganegaraan :</th>
    //                                                                 <td>` + kewarganegaraan1 + `</td>
    //                                                             </tr>
    //                                                             <th></th>
    //                                                             <td></td>
    //                                                         </table>
    //                                                     </div>
    //                                                 </div>

    //                                             </div>
    //                                         </div>
    //                                     </div>
    //                                     </div>
    //             `);
    //             })

    //         }
    //     });

    // }


    // // END DATA DETAIL KELUARGA

    // // Pengajuan Surat
    // tampiltabelpengajuan();

    // function tampiltabelpengajuan() {
    //     $.ajax({
    //         url: "http://www.momomimo.id/desakita-server/pengajuansurat",
    //         type: "GET",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             var no = 1;
    //             $.each(data['data'], function (i, field) {
    //                 var id_pengajuan = field.id_pengajuan;
    //                 var nama_surat = field.nama_surat;
    //                 var nama = field.nama;
    //                 var rt_status = field.rt_status;
    //                 var rw_status = field.rw_status;
    //                 var desa_status = field.desa_status;
    //                 var desa_status = field.desa_status;
    //                 var keperluan = field.keperluan;
    //                 var keterangan = field.keterangan;
    //                 var status = field.status;
    //                 if (rt_status == 1) {
    //                     var rt_ket = `<span class="btn btn-xs btn-success ">Verified <i
    //                     class="fa fa-check"></i></span>`;
    //                 } else {
    //                     var rt_ket = `<span class="btn btn-xs btn-danger ">Not Verified <i
    //                     class="fa fa-refresh"></i></span>`;
    //                 }
    //                 if (rw_status == 1) {
    //                     var rw_ket = `<span class="btn btn-xs btn-success ">Verified <i
    //                     class="fa fa-check"></i></span>`;
    //                 } else {
    //                     var rw_ket = `<span class="btn btn-xs btn-danger ">Not Verified <i
    //                     class="fa fa-refresh"></i></span>`;
    //                 }
    //                 if (desa_status == 1) {
    //                     var desa_ket = `<span class="btn btn-xs btn-success ">Verified <i
    //                     class="fa fa-check"></i></span>`;
    //                 } else {
    //                     var desa_ket = `<span class="btn btn-xs btn-danger ">Not Verified <i
    //                     class="fa fa-refresh"></i></span>`;
    //                 }
    //                 if (status == 1) {
    //                     var ket = "Menunggu RT";
    //                 } else if (status == 2) {
    //                     var ket = "Menunggu RW";
    //                 } else if (status == 3) {
    //                     var ket = "Menunggu Desa";
    //                 } else if (status == 4) {
    //                     var ket = "Konfirmasi Pemohon";
    //                 }
    //                 $("#datapengajuan").append(`
    //                 <tr>
    //                     <td class="text-center">` + no++ + `</td>
    //                     <td>` + nama + `</td>
    //                     <td>` + nama_surat + `</td>
    //                     <td>` + keperluan + `</td>
    //                     <td class="text-center">
    //                         ` + rt_ket + `
    //                     </td>
    //                     <td class="text-center">
    //                     ` + rw_ket + `
    //                     </td>
    //                     <td class="text-center">
    //                     ` + desa_ket + `
    //                     </td>
    //                     <td class="text-center">
    //                     ` + ket + `
    //                     </td>
    //                 </tr>
    //                 `);
    //             });
    //             $('#tabel-pengajuan').DataTable();
    //         }
    //     });
    // }

    // tampilanform_pengajuan();

    // function tampilanform_pengajuan() {
    //     $.ajax({
    //         url: "http://www.momomimo.id/desakita-server/pengajuansurat",
    //         type: "GET",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             $.each(data['listsurat'], function (i, field) {
    //                 var id_surat = field.id;
    //                 var nama = field.nama;
    //                 $("#datasurat").append(`
    //                 <option value="` + id_surat + `">` + nama + `</option>
    //                 `);
    //             });
    //             $.each(data['keluarga'], function (i, field) {
    //                 var id_penduduk = field.id;
    //                 var nama_penduduk = field.nama;
    //                 $("#dataanggota").append(`
    //                 <option value="` + id_penduduk + `">` + nama_penduduk + `</option>
    //                 `);
    //             });
    //             var rt_kk = data['keluarga'][0]['rt'];
    //             var rw_kk = data['keluarga'][0]['rw'];

    //             $("#hidden").append(`
    //                 <input type="hidden" name="rt" value="` + rt_kk + `">
    //                 <input type="hidden" name="rw" value="` + rw_kk + `">
    //                 `);
    //         }
    //     });
    // }
    // $("#btn-tambahpengajuan").click(function () {
    //     var data = $("#form_pengajuan").serialize();
    //     console.log(data);
    //     $.ajax({
    //         url: "http://www.momomimo.id/desakita-server/pengajuansurat",
    //         type: "POST",
    //         data: $("#form_pengajuan").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil ditambahkan");
    //                 window.location.href =
    //                     "pengajuansurat.html";
    //             } else {
    //                 alert("Error, Data Gagal ditambahkan");
    //                 window.location.href =
    //                     "pengajuansurat.html";
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //             window.location.href =
    //                 "form_pengajuan.html";
    //         }
    //     });
    //     return false;
    // });
    // End Pengajuan Surat


    // tampiltabeldata();

    // function tampiltabeldata() {
    //     $.ajax({
    //         url: "http://www.momomimo.id/desakita-server/karyawan",
    //         type: "GET",
    //         dataType: "JSON",
    //         success: function (data) {
    //             console.log(data['data']);
    //             var no = 1;
    //             $.each(data['data'], function (i, field) {
    //                 var id = field.kode_karyawan;
    //                 var jenis = field.kode_cabang;
    //                 var nama = field.nama_depan;
    //                 var alamat = field.nama_belakang;
    //                 var bank = field.jenis_kelamin;
    //                 $("#tampildata").append(`
    //                     <tr>
    //                         <td class="text-center">` + no++ + `</td>
    //                         <td class="text-center">` + id + `</td>
    //                         <td class="text-center">` + jenis + `</td>
    //                         <td>` + nama + `</td>
    //                         <td>` + alamat + `</td>
    //                         <td class="text-center">` + bank +
    //                     `</td>
    //                         <td class="text-center">
    //                             <button type="button" class="btn btn-warning item_edit" name="item_edit" title="Edit" data-toggle="modal" id="` +
    //                     id +
    //                     `" onclick=""><i class="fa fa-edit"></i></button>
    //                             <button type="button" class="btn btn-danger item_hapus"  title="Hapus" data-toggle="modal"id="` +
    //                     id + `"><i class="fa fa-times"></i></button>
    //                         </td>
    //                     </tr> 
    //                 `);
    //             });
    //             $('#tabeldata').DataTable();
    //         }
    //     });

    // }
    // $("#btn-tambah").click(function () {
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: "POST",
    //         data: $("#form-tambah").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil ditambahkan");
    //                 $('#tambah').modal('hide');
    //                 window.location.href =
    //                     "index-app.html";
    //             } else {
    //                 alert("Error, Data Gagal ditambahkan");
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //         }
    //     });
    //     return false;
    // });
    // $(document).on('click', '.item_edit', function () {
    //     var id = $(this).attr('id');
    //     console.log(id);
    //     $.ajax({
    //         type: "GET",
    //         url: "http://localhost/desakita-server/karyawan",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             console.log(data['data']);
    //             $.each(data['data'], function (i, field) {
    //                 var id = field.id;
    //                 var jenis = field.jenis;
    //                 var nama = field.nama_pp;
    //                 var alamat = field.alamat_pp;
    //                 var bank = field.switching;
    //                 $('[id="ide"]').val(id);
    //                 $('[id="jenise"]').val(jenis);
    //                 $('[id="namae"]').val(nama);
    //                 $('[id="alamate"]').val(alamat);
    //                 $('[id="banke"]').val(bank);
    //             });
    //             $('#edit').modal('show');
    //         }
    //     });
    // });
    // $(document).on('click', '#btn-edit', function () {
    //     var data = $("#form-edit").serialize();
    //     console.log(data);
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: 'PUT',
    //         data: $("#form-edit").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil dirubah");
    //                 $('#edit').modal('hide');
    //                 window.location.href =
    //                     "index-app.html";
    //             } else {
    //                 alert("Error, Data Gagal dirubah");
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //         }
    //     });
    //     return false;
    // });
    // $(document).on('click', '.item_hapus', function () {
    //     var id = $(this).attr('id');
    //     console.log(id);
    //     $.ajax({
    //         type: "GET",
    //         url: "http://localhost/desakita-server/karyawan",
    //         dataType: "JSON",
    //         data: {
    //             id: id
    //         },
    //         success: function (data) {
    //             console.log(data['data']);
    //             $.each(data['data'], function (i, field) {
    //                 var id = field.kode_karyawan;
    //                 var nama = field.nama_depan;
    //                 $('[id="idh"]').val(id);
    //                 $('[id="namah"]').val(nama);
    //             });
    //             $('#hapus').modal('show');
    //         }
    //     });
    // });
    // $(document).on('click', '.btn-hapus', function () {
    //     var id = $("#form-hapus").serialize();
    //     console.log(id);
    //     $.ajax({
    //         url: "http://localhost/desakita-server/karyawan",
    //         type: "DELETE",
    //         data: $("#form-hapus").serialize(),
    //         dataType: "JSON",
    //         success: function (result) {
    //             if (result.status) {
    //                 alert("Sukses, Data berhasil dihapus");
    //                 $('#hapus').modal('hide');
    //                 window.location.href =
    //                     "index-app.html";
    //             } else {
    //                 alert("Error, Data Gagal dihapus");
    //             }
    //         },
    //         error: function (xhr, Status, err) {
    //             $("Data Kurang Lengkap : " + Status);
    //         }
    //     });
    //     return false;
    // });
});