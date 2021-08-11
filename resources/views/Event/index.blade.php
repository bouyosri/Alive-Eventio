@extends('event.layout')
@section('content')


    <section class="xs-banner blog-banner banner-bg" style="background-image: url(../wp-content/themes/evenex/assets/images/banner/bg_banner.png)">
        <div class="container">
            <div class="d-flex align-items-center banner-area">
                <div class="row">
                    <div class="col-12">
                        <h1 class="banner-title banner-blog-title" style="color: #ffffff">
                             Events
                        </h1>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <div class="etn-event-archive-wrap">
        <div class="etn-container">
            @guest
            @if (Route::has('login'))
                <div></div>
            @endif
                @else
                    @if (Auth::user()->role !=0)
                        <a href="{{url('/')}}/events/create" style="margin-bottom: 26px;
    left: -108px;" class="metform-btn metform-submit-btn xs-btn" id=""><i aria-hidden="true" class="fa fa-plus-square"></i>					<span>Add Event </span>
                        </a>
                    @endif
            @endguest

            <div class="etn-row etn-event-wrapper">

                @foreach($data as $row)
                    <div class="etn-col-md-6 etn-col-lg-4">
                        <div class="etn-event-item">
                            <div class="etn-event-thumb">
                                <a href="{{url('/')}}/events/{{$row->id }}">
                                    <img src="../wp-content/uploads/images/{{$row->image }}" class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt="" loading="lazy" style="height: 79px;" /> </a>
                                <a href="{{url('/')}}/events/{{$row->id }}" class="xs-event-term">By {{$row->user->name }}</a>
                                <a href="#" class="xs-event-wishlist"><i class="far fa-heart"></i></a>
                            </div>
                            <div class="etn-event-content">
                                <div class="etn-event-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    Budapest
                                </div>
                                <div class="xs-event-item-header">
                                    <div class="xs-event-meta">
                                        <div class="etn-event-date">
                                            <i class="far fa-calendar-alt"></i>
                                            26/02/2021
                                        </div>
                                        <div class="etn-event-location"><i class="fas fa-map-marker-alt"></i> {{$row->location }}</div>
                                    </div>
                                    <h3 class="etn-title etn-event-title"><a href="events/{{$row->id }}">{{$row->name }}</a> </h3>
                                </div>
                                <h3 class="etn-title etn-event-title">
                                    <a href="events/{{$row->id }}">
                                        {{$row->name }} </a>
                                </h3>
                                <p style="overflow: hidden;
                                   text-overflow: ellipsis;
                                   display: -webkit-box;
                                   -webkit-line-clamp: 2; /* number of lines to show */
                                   -webkit-box-orient: vertical;">{{$row->description }} ...</p>
                            </div>
                            <div class="etn-event-footer">
                                <div class="etn-event-date">
                                    <i class="far fa-calendar-alt"></i>
                                    26/02/2021
                                </div>
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </div>

@endsection
