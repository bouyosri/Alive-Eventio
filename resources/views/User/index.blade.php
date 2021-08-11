@extends('event.layout')
@section('content')


    <section class="xs-banner blog-banner banner-bg" style="background-image: url(../wp-content/themes/evenex/assets/images/banner/bg_banner.png)">
        <div class="container">
            <div class="d-flex align-items-center banner-area">
                <div class="row">
                    <div class="col-12">
                        <h1 class="banner-title banner-blog-title" style="color: #ffffff">
                            Users
                        </h1>
                    </div>

                </div>
            </div>
        </div>
    </section>


    <div class="etn-event-archive-wrap">
        <div class="etn-container">
            <div class="etn-row etn-event-wrapper">

                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <table class="table table-image">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                @foreach($data as $row)
                                    <tr>
                                        <th scope="row">{{$row->id }}</th>
                                        <td>{{$row->name }}</td>
                                        <td class="w-25">
                                            @if($row->image)
                                                <img style="    max-height: 113px;" src="../wp-content/uploads/images/{{$row->image}}" class="img-fluid img-thumbnail">
                                            @else
                                                <img style="    max-height: 113px;" src="../wp-content/uploads/images/user1.png" class="img-fluid img-thumbnail">
                                            @endif

                                        </td>
                                        <td>{{$row->email }}</td>
                                        <td>

                                            @if ($row->role == 0)
                                                Client
                                            @elseif ($row->role == 1)
                                                Organizer
                                            @elseif ($row->role == 2)
                                                Admin
                                            @else
                                                Super Admin
                                            @endif
                                        </td>
                                        <td>
                                            <form action="{{ route('organize',$row->id) }}" method="POST">
                                                @csrf
                                                @if ($row->role != 3)


                                                        @if ($row->role == 1 or $row->role == 2)
                                                        <button type="submit"
                                                                class="btn btn-danger" ><i class="far fa-arrow-alt-circle-down"></i></button>

                                                        @elseif ($row->role == 0)
                                                        <button type="submit"
                                                                class="btn btn-success"> <i class="far fa-arrow-alt-circle-up"></i></button>

                                                        @endif
                                                @endif
                                            </form>

                                            <form action="{{ route('organize',$row->id) }}" method="POST">
                                                @csrf
                                                @if ($row->role == 2)
                                                        <button type="submit"
                                                                class="btn btn-danger" ><i class="fa fa-lock" aria-hidden="true"></i></button>
                                                @endif
                                            </form>
                                        </td>
                                    </tr>
                                </tbody>
                                @endforeach
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <style>
        .container {
            padding: 2rem 0rem;
        }

        h4 {
            margin: 2rem 0rem 1rem;
        }

        .table-image {
        td, th {
            vertical-align: middle;
        }
        }
    </style>

@endsection
